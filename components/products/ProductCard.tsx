
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart } from 'lucide-react'
import { type Product } from '@/data/products'
import { useWishlist } from '@/context/WishlistContext'

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, image, shortDescription, category } = product;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(id);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <Link href={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge className="bg-farm-green hover:bg-farm-green-dark">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              inWishlist ? 'bg-farm-green text-white' : 'bg-white text-farm-green'
            }`}
          >
            <Heart className="h-5 w-5" />
          </button>
        </Link>
      </div>
      
      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-farm-green transition-colors">{name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{shortDescription}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-farm-green font-semibold">${price.toFixed(2)}</span>
          <Button size="sm" className="bg-farm-green hover:bg-farm-green-dark">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
