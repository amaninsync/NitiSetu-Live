
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  FileText, 
  BarChart3, 
  Settings,
  FileCheck,
  CheckSquare,
  Upload,
  Table,
  FileDigit
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';

import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface NavItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  requiresDepartmentAccess?: boolean; // Whether this item requires specific department access
  adminOnly?: boolean; // For items that should only be visible to admin or district_collector
}

const navItems: NavItem[] = [
  { 
    title: 'District Dashboard', 
    path: '/', 
    icon: LayoutDashboard, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin', 'contract'] 
  },
  { 
    title: 'Department Dashboard', 
    path: '/departments', 
    icon: Building, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'Project Dashboard', 
    path: '/projects', 
    icon: FileCheck, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'SHG Financing', 
    path: '/shg-financing', 
    icon: Users, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'M&E Dashboard', 
    path: '/monitoring', 
    icon: CheckSquare, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'Reports', 
    path: '/reports', 
    icon: FileText, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'File Upload', 
    path: '/upload', 
    icon: Upload, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
  {
    title: 'Table View',
    path: '/table-view',
    icon: Table,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'Analytics', 
    path: '/analytics', 
    icon: BarChart3, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'Contracts', 
    path: '/contracts', 
    icon: FileDigit, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'Admin Panel', 
    path: '/admin', 
    icon: Settings, 
    roles: ['admin', 'district_collector'],
    adminOnly: true
  }
];

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Filter nav items based on user's role AND department access
  const filteredNavItems = navItems.filter(item => {
    // Only show items if user has appropriate role
    const hasRoleAccess = user?.role && item.roles.includes(user.role);
    if (!hasRoleAccess) return false;
    
    // For admins and collectors, show everything
    if (user.role === 'admin' || user.role === 'district_collector') return true;
    
    // For other users, check department access if required
    if (item.requiresDepartmentAccess) {
      // Check if user has department access
      // The departmentId check ensures they can only see departments they're mapped to
      return user.departmentId !== undefined;
    }
    
    // For items that don't require department access
    return true;
  });
  
  // Helper function to check if a route or its child routes are active
  const isActive = (path: string) => {
    // Exact match for home
    if (path === '/' && currentPath === '/') return true;
    // For other routes, check if currentPath starts with path
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };
  
  // Helper function to generate class names for links
  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return cn(
      // Base styles for all nav items
      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-200",
      // Active state styling - using the new sequence teal colors
      isActive 
        ? "bg-sequence-green-500 text-white font-medium shadow-sm" 
        // Default state styling - improved visibility with darker text
        : "text-white hover:bg-sequence-teal-600 hover:text-white"
    );
  };
  
  return (
    <Sidebar
      className={cn(
        // Updated to use the teal color from the brand guide
        "border-r bg-sequence-teal-500 text-white",
        collapsed ? "w-[70px]" : "w-64"
      )}
    >
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarMenu>
            {filteredNavItems.map((item) => (
              <SidebarMenuItem key={item.path} className="mt-1">
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.path} 
                    className={getLinkClassName} 
                    end={item.path === '/'}
                  >
                    <item.icon 
                      className={cn(
                        "h-5 w-5", 
                        collapsed && "mx-auto", 
                        isActive(item.path) 
                          ? "opacity-100 text-white" 
                          : "opacity-80 text-white"
                      )} 
                    />
                    {!collapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
