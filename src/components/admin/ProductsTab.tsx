
import React, { useState } from "react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import ProductForm from "./ProductForm";
import ConfirmDialog from "./ConfirmDialog";
import { addProduct, updateProduct, deleteProduct } from "@/lib/admin/adminService";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ProductsTabProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductsTab = ({ products, setProducts }: ProductsTabProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = async (productData: Omit<Product, "id">) => {
    setIsLoading(true);
    try {
      const newProduct = await addProduct(productData);
      setProducts([...products, newProduct]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (productData: Product) => {
    setIsLoading(true);
    try {
      const updatedProduct = await updateProduct(productData);
      setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    setIsLoading(true);
    try {
      await deleteProduct(selectedProduct.id);
      setProducts(products.filter(product => product.id !== selectedProduct.id));
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-bold">Products</h2>
        <Button 
          className="bg-olive hover:bg-olive-dark"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">In Stock</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="capitalize">{product.country}</TableCell>
                <TableCell className="capitalize">{product.categoryId}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  {product.inStock ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Out of Stock
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(product)}>
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openDeleteDialog(product)}
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
        <ProductForm 
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddProduct}
          title="Add New Product"
        />
      )}

      {isEditDialogOpen && selectedProduct && (
        <ProductForm 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleUpdateProduct}
          product={selectedProduct}
          title="Edit Product"
        />
      )}

      {isDeleteDialogOpen && selectedProduct && (
        <ConfirmDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteProduct}
          title="Delete Product"
          description={`Are you sure you want to delete ${selectedProduct.name}? This action cannot be undone.`}
          confirmText="Delete"
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ProductsTab;
