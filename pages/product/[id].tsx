import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart } from 'lucide-react'
import { products } from '@/data/products'
import { useToast } from '@/hooks/use-toast'
import { useWishlist } from '@/context/WishlistContext'

const ProductDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const product = products.find(p => p.id === id)
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    )
  }

  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleBuyNow = () => {
    toast({
      title: "Purchase Successful",
      description: `You've purchased ${quantity} ${quantity === 1 ? 'item' : 'items'}.`,
    })
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-farm-green">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/products" className="text-gray-600 hover:text-farm-green">
                    Products
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500 truncate max-w-[200px]">
                    {product.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-md"
            />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {/* Product thumbnail images would go here */}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-start mb-2">
              <Badge className="bg-farm-green hover:bg-farm-green-dark">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className={inWishlist ? "border-farm-green bg-farm-green text-white" : "border-gray-300"}
                onClick={handleWishlistToggle}
              >
                <Heart className="mr-2 h-4 w-4" />
                {inWishlist ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl text-farm-green font-bold mb-4">
              ${product.price.toFixed(2)} per {product.unit}
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.fullDescription}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
              <p className="text-gray-700">
                <span className="font-medium">Farm:</span> {product.seller.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Location:</span> {product.seller.location}
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button
                  onClick={handleDecreaseQuantity}
                  className="w-10 h-10 rounded-l bg-gray-200 flex items-center justify-center border border-gray-300"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 h-10 text-center border-y border-gray-300"
                />
                <button
                  onClick={handleIncreaseQuantity}
                  className="w-10 h-10 rounded-r bg-gray-200 flex items-center justify-center border border-gray-300"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
                <span className="ml-4 text-gray-500">
                  {product.stock} {product.unit}s available
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-farm-green hover:bg-farm-green-dark"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
              <Button variant="outline" className="border-farm-brown text-farm-brown hover:bg-farm-brown hover:text-white">
                Contact Seller
              </Button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                Having issues with a transaction?
              </p>
              <Button 
                variant="link" 
                asChild 
                className="text-red-600 hover:text-red-700 p-0"
              >
                <Link href="/dispute">Report a Dispute</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailPage
