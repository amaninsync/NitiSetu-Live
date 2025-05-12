
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  FileText, 
  BarChart3, 
  Settings,
  FileCheck,
  CheckSquare
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
}

const navItems: NavItem[] = [
  { 
    title: 'District Dashboard', 
    path: '/', 
    icon: LayoutDashboard, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin'] 
  },
  { 
    title: 'Department Dashboard', 
    path: '/departments', 
    icon: Building, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin']
  },
  { 
    title: 'Project Dashboard', 
    path: '/projects', 
    icon: FileCheck, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin']
  },
  { 
    title: 'SHG Financing', 
    path: '/shg-financing', 
    icon: Users, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin']
  },
  { 
    title: 'M&E Dashboard', 
    path: '/monitoring', 
    icon: CheckSquare, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin']
  },
  { 
    title: 'Reports', 
    path: '/reports', 
    icon: FileText, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin']
  },
  { 
    title: 'Analytics', 
    path: '/analytics', 
    icon: BarChart3, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin']
  },
  { 
    title: 'Admin Panel', 
    path: '/admin', 
    icon: Settings, 
    roles: ['admin', 'district_collector']
  }
];

const AppSidebar: React.FC = () => {
  const { collapsed } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Filter nav items based on user's role
  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );
  
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
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all", 
      isActive 
        ? "bg-nitisetu-500 text-white hover:bg-nitisetu-600" 
        : "hover:bg-secondary"
    );
  };
  
  return (
    <Sidebar
      className={cn("border-r bg-sidebar", collapsed ? "w-[70px]" : "w-64")}
      collapsible
    >
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarMenu>
            {filteredNavItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.path} className={getLinkClassName} end={item.path === '/'}>
                    <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
                    {!collapsed && <span>{item.title}</span>}
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
