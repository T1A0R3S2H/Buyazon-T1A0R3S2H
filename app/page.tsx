import './globals.css'
import ProductComparer from '../components/ProductComparer'



export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Amazon Product Comparer</h1>
        </div>
      </header>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ProductComparer />
      </div>
    </main>
  )
}

