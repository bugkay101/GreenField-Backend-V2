import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingBag, DollarSign, Calendar, Package } from 'lucide-react';

// Mock data for demonstration
const purchaseHistory = [
  {
    id: 'PUR001',
    product: 'Organic Tomatoes',
    seller: 'Green Valley Farm',
    date: '2024-01-15',
    amount: '$12.99',
    status: 'Delivered',
    quantity: '2 lbs'
  },
  {
    id: 'PUR002',
    product: 'Fresh Eggs',
    seller: 'Sunny Side Farm',
    date: '2024-01-10',
    amount: '$8.50',
    status: 'Delivered',
    quantity: '1 dozen'
  },
  {
    id: 'PUR003',
    product: 'Organic Carrots',
    seller: 'Earth Fresh Co.',
    date: '2024-01-08',
    amount: '$6.75',
    status: 'In Transit',
    quantity: '3 lbs'
  }
];

const salesHistory = [
  {
    id: 'SAL001',
    product: 'Organic Apples',
    buyer: 'John Smith',
    date: '2024-01-12',
    amount: '$15.99',
    status: 'Shipped',
    quantity: '4 lbs'
  },
  {
    id: 'SAL002',
    product: 'Honey',
    buyer: 'Sarah Johnson',
    date: '2024-01-09',
    amount: '$22.00',
    status: 'Delivered',
    quantity: '2 jars'
  }
];

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('purchases');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'in transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-farm-green mb-4">
              Transaction History
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your purchases and sales activity on GreenField Market
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-farm-green" />
                  <div>
                    <p className="text-sm text-gray-600">Total Purchases</p>
                    <p className="text-xl font-semibold">{purchaseHistory.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-farm-green" />
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-xl font-semibold">$28.24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-farm-green" />
                  <div>
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="text-xl font-semibold">{salesHistory.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-farm-green" />
                  <div>
                    <p className="text-sm text-gray-600">Total Earned</p>
                    <p className="text-xl font-semibold">$37.99</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="sales">Sales History</TabsTrigger>
            </TabsList>

            <TabsContent value="purchases" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Your Purchases</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchaseHistory.map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell className="font-medium">{purchase.id}</TableCell>
                          <TableCell>{purchase.product}</TableCell>
                          <TableCell>{purchase.seller}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{purchase.date}</span>
                            </div>
                          </TableCell>
                          <TableCell>{purchase.quantity}</TableCell>
                          <TableCell className="font-semibold">{purchase.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(purchase.status)}>
                              {purchase.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Your Sales</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sale ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesHistory.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell className="font-medium">{sale.id}</TableCell>
                          <TableCell>{sale.product}</TableCell>
                          <TableCell>{sale.buyer}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{sale.date}</span>
                            </div>
                          </TableCell>
                          <TableCell>{sale.quantity}</TableCell>
                          <TableCell className="font-semibold">{sale.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(sale.status)}>
                              {sale.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Manage Order
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
