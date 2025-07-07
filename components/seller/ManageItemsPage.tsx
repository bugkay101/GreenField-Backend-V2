import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import ItemManagement from './ItemManagement';

const ManageItemsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            title="Manage Your Items"
            description="Add, edit, and manage your agricultural products for sale on our marketplace."
          />
          <ItemManagement />
        </div>
      </div>
    </Layout>
  );
};

export default ManageItemsPage;