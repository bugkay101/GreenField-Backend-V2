
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Dispute {
  id: string;
  transactionId: string;
  disputeType: string;
  description: string;
  contactEmail: string;
  phoneNumber?: string;
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  submittedAt: string;
  buyerName: string;
  sellerName: string;
  amount: number;
}

const mockDisputes: Dispute[] = [
  {
    id: '1',
    transactionId: 'TXN-001',
    disputeType: 'fraud',
    description: 'Paid for organic tomatoes but received regular tomatoes. Seller is not responding to messages.',
    contactEmail: 'buyer1@email.com',
    phoneNumber: '+1-555-0123',
    status: 'pending',
    submittedAt: '2024-01-15',
    buyerName: 'John Smith',
    sellerName: 'Green Valley Farm',
    amount: 45.99
  },
  {
    id: '2',
    transactionId: 'TXN-002',
    disputeType: 'not-received',
    description: 'Ordered vegetables 2 weeks ago, payment was processed but never received the products.',
    contactEmail: 'buyer2@email.com',
    status: 'investigating',
    submittedAt: '2024-01-12',
    buyerName: 'Sarah Johnson',
    sellerName: 'Fresh Fields Co.',
    amount: 78.50
  }
];

const DisputeManagement = () => {
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolution, setResolution] = useState('');
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisputeTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'fraud': 'Fraudulent Transaction',
      'not-received': 'Product Not Received',
      'damaged': 'Product Damaged',
      'not-as-described': 'Not as Described',
      'unauthorized': 'Unauthorized Charge',
      'other': 'Other'
    };
    return labels[type] || type;
  };

  const updateDisputeStatus = (disputeId: string, newStatus: 'investigating' | 'resolved' | 'rejected') => {
    setDisputes(prev => prev.map(dispute => 
      dispute.id === disputeId ? { ...dispute, status: newStatus } : dispute
    ));
    
    const statusMessages = {
      investigating: 'Dispute status updated to investigating',
      resolved: 'Dispute has been resolved',
      rejected: 'Dispute has been rejected'
    };
    
    toast({
      title: "Status Updated",
      description: statusMessages[newStatus],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-farm-green">Dispute Management</h2>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            Pending: {disputes.filter(d => d.status === 'pending').length}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            Investigating: {disputes.filter(d => d.status === 'investigating').length}
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {disputes.map((dispute) => (
          <Card key={dispute.id} className="border-l-4 border-l-farm-green">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Dispute #{dispute.id} - {getDisputeTypeLabel(dispute.disputeType)}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Transaction: {dispute.transactionId} | Amount: ${dispute.amount}
                  </p>
                </div>
                <Badge className={getStatusColor(dispute.status)}>
                  {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold">Buyer: {dispute.buyerName}</p>
                  <p className="text-sm text-gray-600">{dispute.contactEmail}</p>
                  {dispute.phoneNumber && (
                    <p className="text-sm text-gray-600">{dispute.phoneNumber}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">Seller: {dispute.sellerName}</p>
                  <p className="text-sm text-gray-600">Submitted: {dispute.submittedAt}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Description:</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {dispute.description}
                </p>
              </div>

              <div className="flex gap-2">
                {dispute.status === 'pending' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateDisputeStatus(dispute.id, 'investigating')}
                  >
                    Start Investigation
                  </Button>
                )}
                
                {dispute.status === 'investigating' && (
                  <>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => updateDisputeStatus(dispute.id, 'resolved')}
                    >
                      Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateDisputeStatus(dispute.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedDispute(dispute)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Dispute Details - #{dispute.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Transaction ID:</p>
                          <p>{dispute.transactionId}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Amount:</p>
                          <p>${dispute.amount}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Buyer:</p>
                          <p>{dispute.buyerName}</p>
                          <p className="text-sm text-gray-600">{dispute.contactEmail}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Seller:</p>
                          <p>{dispute.sellerName}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Full Description:</p>
                        <p className="bg-gray-50 p-3 rounded">{dispute.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DisputeManagement;
