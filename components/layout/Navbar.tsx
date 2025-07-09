import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, Wallet } from 'lucide-react';
import { CustomConnectButton } from './CustomConnectButton';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    // In a real application, this would connect to a blockchain wallet
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed w-full top-0 left-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-farm-green text-xl font-bold font-poppins">
              GreenField
            </span>
            <span className="text-farm-brown text-xl font-bold font-poppins">
              Market
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-farm-green transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-farm-green transition-colors"
            >
              Products
            </Link>
            <Link
              href="/seller-register"
              className="text-gray-700 hover:text-farm-green transition-colors"
            >
              Become a Seller
            </Link>
            <Link
              href="/history"
              className="text-gray-700 hover:text-farm-green transition-colors"
            >
              History
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-farm-green transition-colors"
            >
              Contact
            </Link>
            <Button asChild variant="outline" size="sm" className="ml-2">
              <Link href="/admin">Admin</Link>
            </Button>

            <CustomConnectButton />
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-farm-green hover:bg-farm-green-dark"
            >
              <Link href="/wishlist">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Wishlist
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white">
            <div className="flex flex-col space-y-4 py-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-farm-green px-4 py-2 rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-farm-green px-4 py-2 rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                href="/seller-register"
                className="text-gray-700 hover:text-farm-green px-4 py-2 rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Become a Seller
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-farm-green px-4 py-2 rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="text-gray-700 hover:text-farm-green px-4 py-2 rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Admin
              </Link>
              <CustomConnectButton />
              <Button
                asChild
                variant="default"
                size="sm"
                className="bg-farm-green hover:bg-farm-green-dark w-full"
              >
                <Link href="/wishlist" onClick={toggleMenu}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;