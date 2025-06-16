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
  CheckSquare,
  Upload,
  Table,
  FileDigit,
  ChevronDown,
  ChevronRight,
  Home,
  Database,
  Wrench,
  Menu,
  X,
  ChevronLeft
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
  requiresDepartmentAccess?: boolean;
  adminOnly?: boolean;
}

interface NavSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  roles: UserRole[];
  requiresDepartmentAccess?: boolean;
}

// Individual nav items
const dashboardItems: NavItem[] = [
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
];

const projectItems: NavItem[] = [
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
];

const monitoringItems: NavItem[] = [
  { 
    title: 'M&E Dashboard', 
    path: '/monitoring', 
    icon: CheckSquare, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin'],
    requiresDepartmentAccess: true
  },
  { 
    title: 'Intelligence', 
    path: '/insights', 
    icon: CheckSquare, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin'],
    requiresDepartmentAccess: true
  },
];

const dataManagementItems: NavItem[] = [
  { 
    title: 'Table View', 
    path: '/table-view', 
    icon: Table, 
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin', 'contract'],
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
];

const systemItems: NavItem[] = [
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

// Organized sections
const navSections: NavSection[] = [
  {
    title: 'Dashboards',
    icon: LayoutDashboard,
    items: dashboardItems,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin', 'contract']
  },
  {
    title: 'Projects',
    icon: FileCheck,
    items: projectItems,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
  {
    title: 'Monitoring',
    icon: CheckSquare,
    items: monitoringItems,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin'],
    requiresDepartmentAccess: true
  },
  {
    title: 'Data Management',
    icon: Database,
    items: dataManagementItems,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
  {
    title: 'System',
    icon: Wrench,
    items: systemItems,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin', 'contract'],
    requiresDepartmentAccess: true
  }
];

const AppSidebar: React.FC = () => {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // State for managing which sections are expanded
  const [expandedSections, setExpandedSections] = useState<string[]>(['Dashboards']);
  
  // Helper function to check if a route or its child routes are active
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };
  
  // Helper function to check if any item in a section is active
  const isSectionActive = (items: NavItem[]) => {
    return items.some(item => isActive(item.path));
  };
  
  // Helper function to toggle section expansion
  const toggleSection = (sectionTitle: string) => {
    if (collapsed) return; // Don't toggle when sidebar is collapsed
    
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };
  
  // Filter sections and items based on user's role and department access
  const filteredSections = navSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const hasRoleAccess = user?.role && item.roles.includes(user.role);
      if (!hasRoleAccess) return false;
      
      if (user.role === 'admin' || user.role === 'district_collector') return true;
      
      if (item.requiresDepartmentAccess) {
        return user.departmentId !== undefined;
      }
      
      return true;
    })
  })).filter(section => {
    // Only show sections that have visible items
    if (section.items.length === 0) return false;
    
    // Check section-level access
    const hasRoleAccess = user?.role && section.roles.includes(user.role);
    if (!hasRoleAccess) return false;
    
    if (user.role === 'admin' || user.role === 'district_collector') return true;
    
    if (section.requiresDepartmentAccess) {
      return user.departmentId !== undefined;
    }
    
    return true;
  });
  
  // Separate top and bottom sections
  const topSections = filteredSections.filter(section => 
    !['Data Management', 'System'].includes(section.title)
  );
  const bottomSections = filteredSections.filter(section => 
    ['Data Management', 'System'].includes(section.title)
  );
  
  // Helper function to generate class names for links
  const getLinkClassName = (isActive: boolean) => {
    return cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
      isActive 
        ? "bg-sequence-green-500 text-white font-medium shadow-sm" 
        : "text-white hover:bg-sequence-teal-600 hover:text-white"
    );
  };
  
  return (
    <Sidebar
      className={cn(
        "border-r bg-sequence-teal-500 text-white transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-64"
      )}
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Top Section with Toggle Button and Home */}
        <div className="pt-2">
          <SidebarGroup>
            <SidebarMenu>
              {/* Sidebar Toggle Button */}
              <SidebarMenuItem className="mb-4">
                <SidebarMenuButton
                  onClick={toggleSidebar}
                  className={cn(
                    "relative flex items-center justify-center w-full transition-all duration-300 ease-in-out group",
                    collapsed 
                      ? "h-12 w-12 mx-auto rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl border border-white/20" 
                      : "px-4 py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl border border-white/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {collapsed ? (
                      <Menu className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <>
                        <div className="p-1 rounded-lg bg-white/10 transition-all duration-200 group-hover:bg-white/20">
                          <ChevronLeft className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                        <span className="font-medium text-white/90 group-hover:text-white transition-colors duration-200">
                          
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Enhanced tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-[60px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 pointer-events-none z-50">
                      <div className="relative">
                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-2xl text-sm font-medium whitespace-nowrap border border-gray-700">
                          Expand Sidebar
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-gray-700"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Homepage Button */}
              <SidebarMenuItem className="mb-4">
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/product" 
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-200 group relative",
                      currentPath === '/'
                        ? "bg-sequence-green-500 text-white font-medium shadow-sm" 
                        : "text-white hover:bg-sequence-teal-600 hover:text-white"
                    )}
                    end
                  >
                    <Home 
                      className={cn(
                        "h-5 w-5", 
                        collapsed && "mx-auto",
                        currentPath === '/' ? "opacity-100 text-white" : "opacity-80 text-white"
                      )} 
                    />
                    {!collapsed && (
                      <span className="font-medium">Home</span>
                    )}
                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-[70px] bg-sequence-teal-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        Home
                      </div>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Top Navigation Sections */}
              {topSections.map((section) => (
                <SidebarMenuItem key={section.title} className="mb-2">
                  {/* Section Header */}
                  <SidebarMenuButton
                    onClick={() => toggleSection(section.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm transition-all duration-200 rounded-md group relative",
                      isSectionActive(section.items)
                        ? "bg-sequence-green-500/20 text-white font-medium"
                        : "text-white hover:bg-sequence-teal-600 hover:text-white",
                      collapsed && "justify-center"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon 
                        className={cn(
                          "h-5 w-5", 
                          collapsed && "mx-auto",
                          isSectionActive(section.items) ? "opacity-100" : "opacity-80"
                        )} 
                      />
                      {!collapsed && (
                        <span className="font-medium">{section.title}</span>
                      )}
                    </div>
                    {!collapsed && (
                      expandedSections.includes(section.title) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-[70px] bg-sequence-teal-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        {section.title}
                      </div>
                    )}
                  </SidebarMenuButton>
                  
                  {/* Section Items */}
                  {(!collapsed && expandedSections.includes(section.title)) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.items.map((item) => (
                        <SidebarMenuButton key={item.path} asChild>
                          <NavLink 
                            to={item.path} 
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
                              isActive(item.path) 
                                ? "bg-sequence-green-500 text-white font-medium shadow-sm" 
                                : "text-white hover:bg-sequence-teal-600 hover:text-white"
                            )}
                            end={item.path === '/'}
                          >
                            <item.icon 
                              className={cn(
                                "h-4 w-4", 
                                isActive(item.path) 
                                  ? "opacity-100 text-white" 
                                  : "opacity-80 text-white"
                              )} 
                            />
                            <span className="text-sm">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </div>

        {/* Bottom Section - Data Management and System */}
        <div className="mt-auto pb-4">
          <SidebarGroup>
            <SidebarMenu>
              {bottomSections.map((section) => (
                <SidebarMenuItem key={section.title} className="mb-2">
                  {/* Section Header */}
                  <SidebarMenuButton
                    onClick={() => toggleSection(section.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm transition-all duration-200 rounded-md group relative",
                      isSectionActive(section.items)
                        ? "bg-sequence-green-500/20 text-white font-medium"
                        : "text-white hover:bg-sequence-teal-600 hover:text-white",
                      collapsed && "justify-center"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon 
                        className={cn(
                          "h-5 w-5", 
                          collapsed && "mx-auto",
                          isSectionActive(section.items) ? "opacity-100" : "opacity-80"
                        )} 
                      />
                      {!collapsed && (
                        <span className="font-medium">{section.title}</span>
                      )}
                    </div>
                    {!collapsed && (
                      expandedSections.includes(section.title) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-[70px] bg-sequence-teal-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        {section.title}
                      </div>
                    )}
                  </SidebarMenuButton>
                  
                  {/* Section Items */}
                  {(!collapsed && expandedSections.includes(section.title)) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.items.map((item) => (
                        <SidebarMenuButton key={item.path} asChild>
                          <NavLink 
                            to={item.path} 
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
                              isActive(item.path) 
                                ? "bg-sequence-green-500 text-white font-medium shadow-sm" 
                                : "text-white hover:bg-sequence-teal-600 hover:text-white"
                            )}
                            end={item.path === '/'}
                          >
                            <item.icon 
                              className={cn(
                                "h-4 w-4", 
                                isActive(item.path) 
                                  ? "opacity-100 text-white" 
                                  : "opacity-80 text-white"
                              )} 
                            />
                            <span className="text-sm">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;