
import { useState } from 'react';
import { Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ProductFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ProductFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ProductFilterProps) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-10 py-2"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="relative">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          {filterOpen && (
            <div className="absolute right-0 top-12 z-10 w-64 bg-white rounded-lg shadow-lg p-4 border animate-fade-in">
              <h3 className="font-semibold text-gray-800 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => onCategoryChange(category)}
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="cursor-pointer text-sm font-medium capitalize"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
