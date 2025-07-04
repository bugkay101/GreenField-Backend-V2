import Layout from '@/components/layout/Layout'
import DisputeForm from '@/components/forms/DisputeForm'

const DisputePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Report a Dispute</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              If you're having issues with a transaction or need help resolving a problem with a seller or buyer, 
              please fill out the form below and our team will assist you.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DisputeForm />
          </div>
          
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Before Filing a Dispute</h3>
            <p className="text-yellow-700 text-sm">
              We recommend first trying to contact the other party directly to resolve the issue. 
              Many problems can be solved through direct communication. Only file a dispute if 
              you're unable to reach a resolution.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DisputePage
