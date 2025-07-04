
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { type SellerApplication } from "@/data/sellers";

interface SellerApplicationTableProps {
  applications: SellerApplication[];
  onStatusChange: (id: string, status: "approved" | "rejected") => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-500";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-yellow-500";
  }
};

const SellerApplicationTable = ({ applications, onStatusChange }: SellerApplicationTableProps) => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<SellerApplication | null>(null);

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    onStatusChange(id, status);
    
    toast({
      title: `Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: `The seller application has been ${status}.`,
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.businessName}</TableCell>
              <TableCell>{application.fullName}</TableCell>
              <TableCell className="capitalize">{application.productCategory}</TableCell>
              <TableCell>{new Date(application.dateApplied).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(application.status)}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      {selectedApplication && (
                        <>
                          <DialogHeader>
                            <DialogTitle>Seller Application Details</DialogTitle>
                            <DialogDescription>
                              Submitted on {new Date(selectedApplication.dateApplied).toLocaleDateString()}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <h4 className="font-medium text-sm text-gray-500">Business Name</h4>
                              <p>{selectedApplication.businessName}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-500">Owner Name</h4>
                              <p>{selectedApplication.fullName}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-500">Category</h4>
                              <p className="capitalize">{selectedApplication.productCategory}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-500">Contact Email</h4>
                              <p>{selectedApplication.email}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-500">Phone</h4>
                              <p>{selectedApplication.phone}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-500">Status</h4>
                              <Badge className={getStatusColor(selectedApplication.status)}>
                                {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="col-span-2">
                              <h4 className="font-medium text-sm text-gray-500">Address</h4>
                              <p>{selectedApplication.address}</p>
                            </div>
                          </div>
                          {selectedApplication.status === "pending" && (
                            <div className="flex justify-end space-x-2 mt-6">
                              <Button
                                variant="outline"
                                onClick={() => handleStatusChange(selectedApplication.id, "rejected")}
                                className="border-red-500 text-red-500 hover:bg-red-50"
                              >
                                Reject
                              </Button>
                              <Button
                                onClick={() => handleStatusChange(selectedApplication.id, "approved")}
                                className="bg-farm-green hover:bg-farm-green-dark"
                              >
                                Approve
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                  {application.status === "pending" && (
                    <>
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={() => handleStatusChange(application.id, "approved")}
                        className="bg-farm-green hover:bg-farm-green-dark"
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleStatusChange(application.id, "rejected")}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SellerApplicationTable;
