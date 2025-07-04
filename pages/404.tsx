import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-farm-green mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-farm-green hover:bg-farm-green-dark">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-farm-brown text-farm-brown hover:bg-farm-brown hover:text-white">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound
