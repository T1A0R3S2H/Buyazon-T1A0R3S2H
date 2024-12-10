![a-modern-and-minimalist-logo-for-buyazon-a-tool-to-jr7nRR4zQsSKGkxUeUflbA-GiLpUFwSQuakM9jhE2-bIQ (1) - Copy](https://github.com/user-attachments/assets/848420da-143d-4d83-a353-aa44930e54b5)
# Buyazon 🛒  
_A tool to compare Amazon products and help users make informed buying decisions._

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction
Buyazon is a React-based application that empowers users to compare Amazon products by analyzing reviews and specifications. By leveraging the **Gemini API** and the **RapidAPI Real-Time Amazon Data API**, Buyazon provides insightful recommendations tailored to user expectations.

---

## Features
- Compare two Amazon products using their URLs.
- Analyze user reviews and specifications.
- Get a detailed recommendation based on user expectations (e.g., cheap, durable).
- Clean and responsive UI with Tailwind CSS.
- Deployed on [Render](https://render.com/).

---

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **APIs**:
  - [Gemini Generative Language API](https://generativelanguage.googleapis.com)
  - [RapidAPI Real-Time Amazon Data API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data)
- **Hosting**: Render

---

## Installation
### Prerequisites
- Node.js v16+ installed on your machine.
- An account on RapidAPI and Google Cloud Console for API keys.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/T1A0R3S2H/Buyazon-T1A0R3S2H.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Usage
1. Enter two Amazon product URLs in the input fields.
2. Specify your expectations (e.g., "cheap and durable").
3. Click **Compare Products**.
4. View the recommendation and a breakdown of both products' reviews and specs.

---

## Environment Variables
The application requires the following environment variables:

```plaintext
RAPIDAPI_KEY=your_rapidapi_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Deployment
### Steps to Deploy on Render
1. Push your project to a GitHub repository.
2. Sign in to [Render](https://render.com/) and create a new Web Service.
3. Connect your GitHub repository and set the environment variables.
4. Specify the build command:
   ```bash
   npm install && npm run build
   ```
5. Specify the start command:
   ```bash
   npm start
   ```
6. Deploy the application.

---

## File Structure
```plaintext
├── app/
│   ├── api/
│   │   ├── compare/
│   │   │   ├── route.ts  # Backend logic for fetching and analyzing product data
├── components/
│   ├── ui/
│   │   ├── button.tsx  # Custom button component
│   │   ├── input.tsx   # Custom input component
│   │   ├── card.tsx    # Custom card component
│   ├── ProductComparer.tsx  # Main UI logic for product comparison
├── public/
├── styles/
├── .env.example  # Sample environment variables file
├── .eslintrc.json  # ESLint configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.js  # Next.js configuration
└── README.md
```

---

## Contributing
Contributions are welcome! To get started:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
If you have any questions or suggestions, feel free to reach out at **your-email@example.com**.

Happy Comparing! 🎉
### Customization
- Replace `your-username` and `your-email@example.com` with your GitHub username and email.
- Update the license section if you're using a different license.
- Replace `https://github.com/your-username/Buyazon.git` with the actual repository URL.

Let me know if you need further adjustments!
