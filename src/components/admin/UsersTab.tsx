
import React, { useState } from "react";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import UserForm from "./UserForm";
import ConfirmDialog from "./ConfirmDialog";
import { addUser, updateUser, deleteUser } from "@/lib/admin/adminService";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface UsersTabProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersTab = ({ users, setUsers }: UsersTabProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = async (userData: Omit<User, "id">) => {
    setIsLoading(true);
    try {
      const newUser = await addUser(userData);
      setUsers([...users, newUser]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (userData: User) => {
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(userData);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    try {
      await deleteUser(selectedUser.id);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-bold">Users</h2>
        <Button 
          className="bg-olive hover:bg-olive-dark"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(user)}>
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openDeleteDialog(user)}
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
        <UserForm 
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddUser}
          title="Add New User"
        />
      )}

      {isEditDialogOpen && selectedUser && (
        <UserForm 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleUpdateUser}
          user={selectedUser}
          title="Edit User"
        />
      )}

      {isDeleteDialogOpen && selectedUser && (
        <ConfirmDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteUser}
          title="Delete User"
          description={`Are you sure you want to delete ${selectedUser.name}? This action cannot be undone.`}
          confirmText="Delete"
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default UsersTab;
