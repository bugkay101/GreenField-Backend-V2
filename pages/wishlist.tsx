import Layout from '@/components/layout/Layout'
import ProductCard from '@/components/products/ProductCard'
import { Button } from '@/components/ui/button'
import { useWishlist } from '@/context/WishlistContext'
import Link from 'next/link'

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist()

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            Products you've saved for later
          </p>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">
              Add products to your wishlist to keep track of items you're interested in
            </p>
            <Button asChild className="bg-farm-green hover:bg-farm-green-dark">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                Clear Wishlist
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default WishlistPage
