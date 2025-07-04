
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DisputeFormData {
  transactionId: string;
  disputeType: string;
  description: string;
  contactEmail: string;
  phoneNumber: string;
}

const DisputeForm = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<DisputeFormData>();
  const { toast } = useToast();

  const onSubmit = (data: DisputeFormData) => {
    console.log('Dispute submitted:', data);
    toast({
      title: "Dispute Submitted",
      description: "Your dispute has been submitted and will be reviewed within 24-48 hours. You will receive updates via email.",
    });
    reset();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-farm-green">Submit a Dispute</CardTitle>
        <p className="text-gray-600">
          Report fraudulent transactions or issues with your purchases
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="transactionId">Transaction ID *</Label>
            <Input
              id="transactionId"
              {...register('transactionId', { required: 'Transaction ID is required' })}
              placeholder="Enter your transaction or order ID"
            />
            {errors.transactionId && (
              <p className="text-red-500 text-sm mt-1">{errors.transactionId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="disputeType">Dispute Type *</Label>
            <Select onValueChange={(value) => setValue('disputeType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select dispute type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fraud">Fraudulent Transaction</SelectItem>
                <SelectItem value="not-received">Product Not Received</SelectItem>
                <SelectItem value="damaged">Product Damaged/Defective</SelectItem>
                <SelectItem value="not-as-described">Product Not as Described</SelectItem>
                <SelectItem value="unauthorized">Unauthorized Charge</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              placeholder="Please provide detailed information about the issue, including dates, amounts, and any communication with the seller"
              rows={5}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactEmail">Contact Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              {...register('contactEmail', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/,
                  message: 'Please enter a valid email'
                }
              })}
              placeholder="your.email@example.com"
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              {...register('phoneNumber')}
              placeholder="Optional: Your phone number for follow-up"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Information:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• All disputes are reviewed within 24-48 hours</li>
              <li>• You will receive email updates on your dispute status</li>
              <li>• Please provide as much detail as possible for faster resolution</li>
              <li>• Keep all transaction records and communications with sellers</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-farm-green hover:bg-farm-green-dark"
          >
            Submit Dispute
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DisputeForm;
