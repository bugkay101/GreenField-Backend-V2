import Layout from '@/components/layout/Layout'
import SellerRegistrationForm from '@/components/forms/SellerRegistrationForm'

const SellerRegistrationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our marketplace and start selling your agricultural products directly to consumers. 
              Fill out the form below to apply as a seller.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <SellerRegistrationForm />
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Why Sell with GreenField Market?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2 text-farm-green">Direct Sales</h3>
                <p className="text-gray-700">
                  Connect directly with consumers and sell your products without intermediaries, increasing your profit margin.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2 text-farm-green">Wide Reach</h3>
                <p className="text-gray-700">
                  Access a broader customer base beyond your local area, expanding your market opportunities.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2 text-farm-green">Simple Process</h3>
                <p className="text-gray-700">
                  Easy setup and management of your product listings with our user-friendly platform.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2 text-farm-green">Community Support</h3>
                <p className="text-gray-700">
                  Join a community of farmers and producers committed to sustainable and ethical agricultural practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SellerRegistrationPage
