import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ItemFormProps {
  item?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ItemForm = ({ item, onSubmit, onCancel }: ItemFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    shortDescription: '',
    fullDescription: '',
    stock: '',
    unit: '',
    sellerName: '',
    sellerLocation: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || '',
        price: item.price?.toString() || '',
        shortDescription: item.shortDescription || '',
        fullDescription: item.fullDescription || '',
        stock: item.stock?.toString() || '',
        unit: item.unit || '',
        sellerName: item.sellerName || '',
        sellerLocation: item.sellerLocation || '',
        imageUrl: item.imageUrl || ''
      });
    }
  }, [item]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.shortDescription) {
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Organic Apples"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleInputChange('stock', e.target.value)}
            placeholder="100"
          />
        </div>
        
        <div>
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            value={formData.unit}
            onChange={(e) => handleInputChange('unit', e.target.value)}
            placeholder="lb, bunch, package"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="shortDescription">Short Description *</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => handleInputChange('shortDescription', e.target.value)}
          placeholder="Brief description for product cards"
          required
        />
      </div>

      <div>
        <Label htmlFor="fullDescription">Full Description</Label>
        <Textarea
          id="fullDescription"
          value={formData.fullDescription}
          onChange={(e) => handleInputChange('fullDescription', e.target.value)}
          placeholder="Detailed description of your product..."
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sellerName">Your Farm/Business Name</Label>
          <Input
            id="sellerName"
            value={formData.sellerName}
            onChange={(e) => handleInputChange('sellerName', e.target.value)}
            placeholder="Green Valley Farm"
          />
        </div>
        
        <div>
          <Label htmlFor="sellerLocation">Location</Label>
          <Input
            id="sellerLocation"
            value={formData.sellerLocation}
            onChange={(e) => handleInputChange('sellerLocation', e.target.value)}
            placeholder="City, State"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="bg-farm-green hover:bg-farm-green-dark">
          {item ? 'Update Item' : 'Add Item'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;