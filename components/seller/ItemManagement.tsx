import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus } from "lucide-react";
import ItemForm from "./ItemForm";
import { createItem, deleteItem, editItem } from "@/contract/item-write";

interface Item {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  status?: "active" | "inactive";
}

const ItemManagement = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Organic Apples",
      category: "fruits",
      price: 3.99,
      stock: 50,
      unit: "lb",
      status: "active",
    },
    {
      id: 2,
      name: "Fresh Carrots",
      category: "vegetables",
      price: 2.49,
      stock: 30,
      unit: "bunch",
      status: "active",
    },
  ]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddItem = async (itemData: any) => {
    try {
      const newItem = itemData;
      const hash = await createItem(
        newItem.name,
        newItem.category,
        newItem.imageUrl,
        newItem.unit,
        newItem.description,
        newItem.price,
        newItem.stock
      );

      if (hash) {
        toast({
          title: "Item Added",
          description: `${itemData.name} has been added successfully.`,
        });
        setIsDialogOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error Adding ITem",
        description: `unable to add ${itemData.name} .`,
      });
    }
  };

  const handleEditItem = async (itemData: any) => {
    try {
      if (editingItem) {
        const newItem = itemData;
        const hash = await editItem(
          editingItem.id,
          newItem.name,
          newItem.category,
          newItem.imageUrl,
          newItem.unit,
          newItem.description,
          newItem.price,
          newItem.stock
        );

        if (hash) {
          toast({
            title: "Item Updated",
            description: `${itemData.name} has been updated successfully.`,
          });
          setEditingItem(null);
          setIsDialogOpen(false);
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error Editing Item",
        description: `unable to edit ${itemData.name} .`,
      });
    }
  };

  const handleDeleteItem = (id: number) => {
    try {
      const hash = deleteItem(id);
      if (hash) {
        toast({
          title: "Item Deleted",
          description: `Item deleted successfully.`,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error deleting Item",
        description: `unable to delete.`,
      });
    }
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Items</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openAddDialog}
              className="bg-farm-green hover:bg-farm-green-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Item" : "Add New Item"}
              </DialogTitle>
            </DialogHeader>
            <ItemForm
              item={editingItem}
              onSubmit={editingItem ? handleEditItem : handleAddItem}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="capitalize">{item.category}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  {item.stock} {item.unit}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ItemManagement;
