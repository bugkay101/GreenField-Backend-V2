import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import SellerApplicationTable from '@/components/admin/SellerApplicationTable'
import { sellerApplications as initialSellerApplications } from '@/data/sellers'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const AdminPage = () => {
  const [sellerApplications, setSellerApplications] = useState(initialSellerApplications)

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    setSellerApplications(applications => 
      applications.map(app => 
        app.id === id ? { ...app, status } : app
      )
    )
  }

  const pendingApplications = sellerApplications.filter(app => app.status === "pending")
  const approvedApplications = sellerApplications.filter(app => app.status === "approved")
  const rejectedApplications = sellerApplications.filter(app => app.status === "rejected")

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage seller applications and platform operations.
          </p>
        </div>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending Applications ({pendingApplications.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved Sellers ({approvedApplications.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected Applications ({rejectedApplications.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Pending Applications</h2>
              {pendingApplications.length === 0 ? (
                <p className="text-gray-500">No pending applications at this time.</p>
              ) : (
                <SellerApplicationTable 
                  applications={pendingApplications} 
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Approved Sellers</h2>
              {approvedApplications.length === 0 ? (
                <p className="text-gray-500">No approved sellers yet.</p>
              ) : (
                <SellerApplicationTable 
                  applications={approvedApplications} 
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Rejected Applications</h2>
              {rejectedApplications.length === 0 ? (
                <p className="text-gray-500">No rejected applications.</p>
              ) : (
                <SellerApplicationTable 
                  applications={rejectedApplications} 
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default AdminPage
