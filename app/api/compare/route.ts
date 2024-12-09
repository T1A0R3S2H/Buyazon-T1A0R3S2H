import { NextResponse } from 'next/server';
import axios from 'axios';
import markdownit from 'markdown-it';
import dotenv from 'dotenv';
dotenv.config();

// Function to extract ASIN from Amazon URLs
function extractASIN(amazonUrl: string) {
  const regex = /\/([A-Z0-9]{10})(?:[\/?]|$)/;
  const match = amazonUrl.match(regex);
  return match ? match[1] : null;
}

// Function to fetch product reviews from the Real-time Amazon Data API
async function fetchProductReviews(asin: string) {
  const options = {
    method: 'GET',
    url: 'https://real-time-amazon-data.p.rapidapi.com/product-reviews',
    params: {
      asin: asin,
      country: 'IN',
      sort_by: 'MOST_RECENT',
      star_rating: 'ALL',
      verified_purchases_only: 'false',
      images_or_videos_only: 'false',
      current_format_only: 'false',
      page: '1',
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(`Fetched reviews for ASIN: ${asin}`);
    return response.data.data.reviews || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching reviews for ASIN: ${asin}`, error.message);
    } else {
      console.error(`Unknown error fetching reviews for ASIN: ${asin}`, error);
    }
    return [];
  }
}

// Function to send reviews to Gemini API for analysis and recommendation
async function analyzeReviewsAndRecommend(reviews1: any[], reviews2: any[], userExpectation: string) {
  const geminiOptions = {
    method: 'POST',
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
    data: {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Compare the reviews of the following two products and suggest the better one based on the user's expectation of being "${userExpectation}": 
        Product 1 Reviews: ${reviews1.slice(0, 9).map((review) => review.review_comment).join(' ')} 
        Product 2 Reviews: ${reviews2.slice(0, 9).map((review) => review.review_comment).join(' ')}
        in about 150 words and the format should be like this: first give a line which product you suggest and why according to the expectation of the user and then in the 2nd para, highlight the specs of both the products and pros and cons`,
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: 'If I absolutely had to choose one, which would it be and why?',
            },
          ],
        },
      ],
      systemInstruction: {
        role: 'user',
        parts: [
          {
            text: 'Use the reviews to compare the products based on user feedback and suggest the best product.',
          },
        ],
      },
      generationConfig: {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
    },
  };

  try {
    const response = await axios.request(geminiOptions);
    console.log('Analysis successful. Getting recommendation...');
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error analyzing reviews:', error.message);
      if ((error as any).code === 'ETIMEDOUT') {
        console.error('Request timed out. Please check your internet connection or API endpoint.');
      }
    } else {
      console.error('Unknown error analyzing reviews:', error);
    }
    return 'An error occurred while analyzing reviews. Please try again later.';
  }
}

// Main POST handler to receive the request from frontend and process it
export async function POST(request: Request) {
  const { url1, url2, userExpectation } = await request.json();  // Extract userExpectation

  const asin1 = extractASIN(url1);  // Extract ASIN from first URL
  const asin2 = extractASIN(url2);  // Extract ASIN from second URL

  // Validate extracted ASINs
  if (!asin1 || !asin2) {
    console.error('Invalid ASINs extracted from the provided URLs.');
    return NextResponse.json(
      { error: 'Invalid ASINs extracted from the provided URLs.' },
      { status: 400 }
    );
  }

  console.log(`Extracted ASINs: ASIN 1 = ${asin1}, ASIN 2 = ${asin2}`);

  // Fetch reviews for both products
  const reviews1 = await fetchProductReviews(asin1);
  const reviews2 = await fetchProductReviews(asin2);

  // Handle case if no reviews are found
  if (!reviews1.length || !reviews2.length) {
    console.error('No reviews fetched for one or both products.');
    return NextResponse.json(
      { error: 'No reviews fetched for one or both products.' },
      { status: 400 }
    );
  }

  // Pass reviews and userExpectation to the analysis function
  const recommendation = await analyzeReviewsAndRecommend(reviews1, reviews2, userExpectation);
  console.log(`Gemini's recommendation: ${recommendation}`);

  // Use markdown-it to render the recommendation as HTML
  // Use markdown-it to render the recommendation as HTML
const md = markdownit();
let formattedRecommendation = md.render(recommendation);

// Replace HTML-encoded entities like &quot; with actual quotes and other common HTML entities
formattedRecommendation = formattedRecommendation
  .replace(/&quot;/g, '"')  // Replaces &quot; with "
  .replace(/&amp;/g, '&')   // Replaces &amp; with &
  .replace(/&lt;/g, '<')    // Replaces &lt; with <
  .replace(/&gt;/g, '>')    // Replaces &gt; with >
  .replace(/&nbsp;/g, ' '); // Replaces &nbsp; with a space

// Replace <p> with newline and </p> with an empty space to preserve paragraphs
formattedRecommendation = formattedRecommendation.replace(/<p>/g, '\n').replace(/<\/p>/g, '\n');

// Remove other HTML tags (e.g., <strong>, <em>) but keep the line breaks and text structure
let plainTextRecommendation = formattedRecommendation.replace(/<\/?[^>]+(>|$)/g, ""); 

// Trim the result to remove any leading or trailing whitespace
plainTextRecommendation = plainTextRecommendation.trim();

// Return the plain text recommendation to the frontend
return NextResponse.json({ recommendation: plainTextRecommendation });


}
