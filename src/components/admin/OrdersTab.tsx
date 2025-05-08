
import React, { useState } from "react";
import { Order, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import OrderDetailDialog from "./OrderDetailDialog";
import { updateOrderStatus } from "@/lib/admin/adminService";
import { getUserById } from "@/lib/data";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface OrdersTabProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  users: User[];
}

const OrdersTab = ({ orders, setOrders, users }: OrdersTabProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleOpenOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    const updatedOrder = await updateOrderStatus(orderId, status);
    if (updatedOrder) {
      setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-bold">Orders</h2>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {orders.map((order) => {
              const user = getUserById(order.userId);
              return (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{user?.name || 'Unknown'}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'canceled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenOrderDetails(order)}>
                        <Edit size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {isDetailDialogOpen && selectedOrder && (
        <OrderDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          order={selectedOrder}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default OrdersTab;
