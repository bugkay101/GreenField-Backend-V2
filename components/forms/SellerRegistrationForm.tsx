
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SellerRegistrationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    fullName: "",
    businessName: "",
    productCategory: "",
    phone: "",
    email: "",
    address: "",
    idImage: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, productCategory: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormState((prev) => ({ ...prev, idImage: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formState.fullName || !formState.businessName || !formState.productCategory || 
        !formState.phone || !formState.email || !formState.address || !formState.idImage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: "Your seller application has been received. We'll review it and get back to you soon.",
      });
      setIsSubmitting(false);
      setFormState({
        fullName: "",
        businessName: "",
        productCategory: "",
        phone: "",
        email: "",
        address: "",
        idImage: null,
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formState.fullName}
            onChange={handleInputChange}
            placeholder="John Smith"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            value={formState.businessName}
            onChange={handleInputChange}
            placeholder="Smith Family Farms"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCategory">Product Category</Label>
          <Select value={formState.productCategory} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={handleInputChange}
            placeholder="555-123-4567"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idUpload">ID Upload</Label>
          <Input
            id="idUpload"
            name="idUpload"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            required
          />
          <p className="text-xs text-gray-500">Upload a government-issued ID or business license</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Farm/Business Address</Label>
        <Textarea
          id="address"
          name="address"
          value={formState.address}
          onChange={handleInputChange}
          placeholder="1234 Farm Road, Ruralville, RV 12345"
          rows={3}
          required
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button
          type="submit"
          className="bg-farm-green hover:bg-farm-green-dark px-8 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
};

export default SellerRegistrationForm;
