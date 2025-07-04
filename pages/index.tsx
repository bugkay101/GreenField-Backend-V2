import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import ProductCard from '@/components/products/ProductCard'
import { products } from '@/data/products'

const Index = () => {
  // Display only 4 featured products on the homepage
  const featuredProducts = products.slice(0, 4)
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-farm-cream py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-farm-green-dark">
              From Farm to Your Table
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-700">
              GreenField Market connects local farmers directly with consumers. 
              Fresh produce, sustainable practices, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-farm-green hover:bg-farm-green-dark">
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-farm-brown text-farm-brown hover:bg-farm-brown hover:text-white">
                <Link href="/seller-register">
                  Become a Seller
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1978&q=80" 
                alt="Farmer with fresh produce" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-5 -left-5 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Fresh vegetables" 
                  className="w-32 h-32 object-cover rounded-lg shadow-lg border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GreenField Market</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-farm-green-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-farm-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh & Local</h3>
              <p className="text-gray-600">
                All products come directly from local farms to ensure maximum freshness and quality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-farm-green-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-farm-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Farmers</h3>
              <p className="text-gray-600">
                Buy directly from farmers, ensuring they receive fair compensation for their hard work.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-farm-green-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-farm-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
              <p className="text-gray-600">
                We prioritize environmentally friendly farming and packaging to protect our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="link" className="text-farm-green">
              <Link href="/products" className="flex items-center">
                View All Products
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-farm-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Jane Cooper</h3>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The produce from GreenField Market is always fresh and delicious. I love knowing that I'm supporting local farmers while feeding my family healthy food."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-farm-brown rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Michael Johnson</h3>
                  <p className="text-sm text-gray-500">Seller</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a small-scale farmer, this platform has allowed me to reach more customers and grow my business. The direct connection with buyers makes all the difference."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-farm-green-light rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Sarah Williams</h3>
                  <p className="text-sm text-gray-500">Chef</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The quality of ingredients I source from GreenField Market elevates my cooking. My restaurant customers can taste the difference in freshness and quality."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-farm-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking for fresh produce or want to sell your farm products,
            GreenField Market is the place to connect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-farm-green">
              <Link href="/products">
                Browse Products
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-farm-green hover:bg-farm-cream">
              <Link href="/seller-register">
                Become a Seller
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Index
