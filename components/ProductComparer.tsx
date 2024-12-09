'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export default function ProductComparer() {
  const [url1, setUrl1] = useState('')
  const [url2, setUrl2] = useState('')
  const [userExpectation, setUserExpectation] = useState('')
  const [comparison, setComparison] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCompare = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url1, url2, userExpectation }),
      })
      const data = await response.json()
      setComparison(data.recommendation)
    } catch (error) {
      console.error('Error comparing products:', error)
      setComparison('An error occurred while comparing the products. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter first Amazon product URL"
            value={url1}
            onChange={(e) => setUrl1(e.target.value)}
            className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Input
            type="text"
            placeholder="Enter second Amazon product URL"
            value={url2}
            onChange={(e) => setUrl2(e.target.value)}
            className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Input
            type="text"
            placeholder="Enter your product expectations (e.g., cheap, durable)"
            value={userExpectation}
            onChange={(e) => setUserExpectation(e.target.value)}
            className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Button
            onClick={handleCompare}
            disabled={isLoading || !url1 || !url2 || !userExpectation}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? 'Comparing...' : 'Compare Products'}
          </Button>
        </div>
        {comparison && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Comparison Result:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{comparison}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

