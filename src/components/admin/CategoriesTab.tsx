
import React, { useState } from "react";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import CategoryForm from "./CategoryForm";
import ConfirmDialog from "./ConfirmDialog";
import { addCategory, updateCategory, deleteCategory } from "@/lib/admin/adminService";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface CategoriesTabProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoriesTab = ({ categories, setCategories }: CategoriesTabProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = async (categoryData: Omit<Category, "id">) => {
    setIsLoading(true);
    try {
      const newCategory = await addCategory(categoryData);
      setCategories([...categories, newCategory]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async (categoryData: Category) => {
    setIsLoading(true);
    try {
      const updatedCategory = await updateCategory(categoryData);
      setCategories(categories.map(category => category.id === updatedCategory.id ? updatedCategory : category));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    
    setIsLoading(true);
    try {
      await deleteCategory(selectedCategory.id);
      setCategories(categories.filter(category => category.id !== selectedCategory.id));
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-bold">Categories</h2>
        <Button 
          className="bg-olive hover:bg-olive-dark"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="capitalize">{category.country}</TableCell>
                <TableCell>
                  <p className="truncate max-w-xs">{category.description}</p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(category)}>
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openDeleteDialog(category)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isAddDialogOpen && (
        <CategoryForm 
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddCategory}
          title="Add New Category"
        />
      )}

      {isEditDialogOpen && selectedCategory && (
        <CategoryForm 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleUpdateCategory}
          category={selectedCategory}
          title="Edit Category"
        />
      )}

      {isDeleteDialogOpen && selectedCategory && (
        <ConfirmDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteCategory}
          title="Delete Category"
          description={`Are you sure you want to delete ${selectedCategory.name}? This action cannot be undone.`}
          confirmText="Delete"
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default CategoriesTab;
