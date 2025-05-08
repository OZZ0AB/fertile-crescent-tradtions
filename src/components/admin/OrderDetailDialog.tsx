
import React from "react";
import { Order, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getOrderItems } from "@/lib/admin/adminService";
import { getUserById } from "@/lib/data";

interface OrderDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onStatusChange: (orderId: string, status: Order['status']) => void;
}

const OrderDetailDialog = ({ isOpen, onClose, order, onStatusChange }: OrderDetailDialogProps) => {
  const orderItems = getOrderItems(order.items);
  const user = getUserById(order.userId) as User;
  
  const handleStatusChange = (status: string) => {
    onStatusChange(order.id, status as Order['status']);
  };

  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return "bg-green-100 text-green-800";
      case 'shipped':
        return "bg-blue-100 text-blue-800";
      case 'processing':
        return "bg-yellow-100 text-yellow-800";
      case 'canceled':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
          <DialogDescription className="flex items-center space-x-2">
            <span>Status:</span>
            <Badge className={getStatusBadgeColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Customer Information</h3>
            <p className="text-sm">{user?.name}</p>
            <p className="text-sm">{user?.email}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">Order Date</h3>
            <p className="text-sm">{order.date}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">Update Status</h3>
            <Select 
              value={order.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Order Items</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm">{item.product?.name || "Product not found"}</td>
                      <td className="px-4 py-2 text-sm text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-sm text-right">${item.product?.price.toFixed(2) || "0.00"}</td>
                      <td className="px-4 py-2 text-sm text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Total:</td>
                    <td className="px-4 py-2 text-sm font-bold text-right">${order.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
