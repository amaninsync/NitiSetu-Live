
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Building2, 
  Home, 
  LineChart, 
  Menu, 
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Map,
  HandCoins,
  Stethoscope,
  PieChart,
  AreaChart,
  FileBarChart,
  FileStack
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = React.useState({
    district: false,
    projects: false,
    monitoring: false,
    health: false
  });
  
  // Define nested menu structure
  const navItems = [
    { 
      id: 'district',
      label: 'District View', 
      icon: <Home size={18} />,
      path: '/district-dashboard',
      children: [
        { path: '/district-stats', label: 'District Stats', icon: <PieChart size={18} /> },
        { path: '/district-view', label: 'District View', icon: <AreaChart size={18} /> }
      ]
    },
    { 
      id: 'health',
      label: 'Health Data', 
      icon: <Stethoscope size={18} />,
      path: '/health-data'
    },
    { 
      id: 'projects',
      label: 'Projects', 
      icon: <LineChart size={18} />,
      path: '/project',
      children: [
        { path: '/shg-financing', label: 'SHG Financing', icon: <HandCoins size={18} /> }
      ]
    },
    { 
      id: 'departments',
      label: 'Departments', 
      icon: <Building2 size={18} />,
      path: '/department',
      children: [
        { path: '/department-view', label: 'Department View', icon: <FileStack size={18} /> }
      ]
    },
    { 
      id: 'monitoring',
      label: 'Monitoring & Evaluation', 
      icon: <BarChart3 size={18} />,
      path: '/table-view',
      children: [
        { path: '/road-network', label: 'Road Network', icon: <Map size={18} /> }
      ]
    },
    { 
      id: 'insights',
      label: 'Insights', 
      icon: <Lightbulb size={18} />,
      path: '/insights',
      children: [
        { path: '/monitoring-view', label: 'Monitoring View', icon: <FileBarChart size={18} /> }
      ]
    },
  ];

  // Toggle expand/collapse for parent items
  const toggleExpand = (groupId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Check if a route is active (either exact match or a child route)
  const isRouteActive = (path: string) => {
    // Direct match
    if (location.pathname === path) {
      return true;
    }
    
    // Check if any child route is active
    const item = navItems.find(item => item.path === path);
    if (item?.children) {
      return item.children.some(child => child.path === location.pathname);
    }
    
    return false;
  };

  return (
    <Sidebar className={cn("bg-white border-r border-border", collapsed ? "w-14" : "w-64")}>
      <SidebarContent>
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isActive = isRouteActive(item.path);
          const isExpanded = expandedGroups[item.id];
          
          return (
            <SidebarGroup key={item.id}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md w-full",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                    onClick={(e) => {
                      if (hasChildren) {
                        e.preventDefault();
                        toggleExpand(item.id, e);
                      }
                    }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-grow">{item.label}</span>
                        {hasChildren && (
                          <span className="ml-2">
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </SidebarMenuItem>
                
                {/* Child menu items */}
                {hasChildren && isExpanded && !collapsed && (
                  <div className="ml-6 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <SidebarMenuItem key={child.path}>
                        <Link
                          to={child.path}
                          className={cn(
                            "flex items-center px-3 py-2 rounded-md",
                            location.pathname === child.path 
                              ? "bg-primary/10 text-primary" 
                              : "hover:bg-muted"
                          )}
                        >
                          <span className="mr-2">{child.icon}</span>
                          <span>{child.label}</span>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarTrigger className="absolute bottom-4 right-4" />
    </Sidebar>
  );
};

export default AppSidebar;
