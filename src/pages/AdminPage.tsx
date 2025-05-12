
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { mockUsers, rolePermissions } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState("district_collector");
  
  // Mock permissions
  const mockPermissionsList = [
    { id: "view_all", name: "View All Content", description: "Can view all content across departments" },
    { id: "edit_all", name: "Edit All Content", description: "Can edit all content across departments" },
    { id: "approve_all", name: "Approve All Content", description: "Can approve all content and requests" },
    { id: "create_all", name: "Create All Content", description: "Can create all content types" },
    { id: "delete_all", name: "Delete All Content", description: "Can delete all content" },
    { id: "manage_users", name: "Manage Users", description: "Can create and manage user accounts" },
    { id: "manage_roles", name: "Manage Roles", description: "Can manage role assignments and permissions" },
    { id: "view_department", name: "View Department", description: "Can view own department content" },
    { id: "edit_department", name: "Edit Department", description: "Can edit own department content" },
    { id: "approve_department", name: "Approve Department", description: "Can approve own department requests" },
    { id: "create_department", name: "Create Department Content", description: "Can create content for own department" },
    { id: "view_assigned", name: "View Assigned", description: "Can view specifically assigned content" },
    { id: "edit_assigned", name: "Edit Assigned", description: "Can edit specifically assigned content" },
    { id: "view_limited", name: "View Limited", description: "Can view a limited set of content" },
  ];
  
  // State for role permissions
  const [permissions, setPermissions] = useState<Record<string, string[]>>(rolePermissions);
  
  const handlePermissionChange = (permissionId: string) => {
    setPermissions(prev => {
      const currentPermissions = [...(prev[selectedRole] || [])];
      
      if (currentPermissions.includes(permissionId)) {
        return {
          ...prev,
          [selectedRole]: currentPermissions.filter(id => id !== permissionId)
        };
      } else {
        return {
          ...prev, 
          [selectedRole]: [...currentPermissions, permissionId]
        };
      }
    });
  };
  
  const savePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: `Permissions for ${selectedRole} have been updated successfully.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users, roles and system settings
        </p>
      </div>
      
      <Tabs defaultValue="permissions">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="permissions">Permission Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure access rights for each role in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    <div className="font-medium">Select Role</div>
                    <div className="grid gap-2">
                      {Object.keys(permissions).map(role => (
                        <div 
                          key={role} 
                          className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                            selectedRole === role 
                              ? 'bg-nitisetu-500 text-white' 
                              : 'bg-secondary hover:bg-secondary/80'
                          }`}
                          onClick={() => setSelectedRole(role)}
                        >
                          {role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-4">
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Permission</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-center">Enabled</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPermissionsList.map(permission => {
                          const isEnabled = permissions[selectedRole]?.includes(permission.id);
                          
                          return (
                            <TableRow key={permission.id}>
                              <TableCell className="font-medium">
                                {permission.name}
                              </TableCell>
                              <TableCell>
                                {permission.description}
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox 
                                  checked={isEnabled}
                                  onCheckedChange={() => handlePermissionChange(permission.id)}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      className="bg-nitisetu-500 hover:bg-nitisetu-600"
                      onClick={savePermissions}
                    >
                      Save Permission Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </TableCell>
                      <TableCell>
                        <span className={`rounded-full px-2 py-1 text-xs ${
                          user.active ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'
                        }`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system-wide settings and options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                System settings functionality will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
