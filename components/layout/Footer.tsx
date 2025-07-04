
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-farm-green-light text-xl font-bold font-poppins">GreenField</span>
              <span className="text-white text-xl font-bold font-poppins">Market</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Connecting farmers directly to consumers, supporting local agriculture and sustainable practices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/seller-register" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=fruits" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Fruits
                </Link>
              </li>
              <li>
                <Link href="/products?category=vegetables" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link href="/products?category=dairy" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Dairy
                </Link>
              </li>
              <li>
                <Link href="/products?category=grains" className="text-gray-300 hover:text-farm-green-light transition-colors">
                  Grains
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-300 not-italic">
              <p>123 Farm Road</p>
              <p>Rural County, RC 12345</p>
              <p className="mt-2">Email: info@greenfieldmarket.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} GreenField Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
