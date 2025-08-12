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
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Eye,
  TrendingUp,
  PieChart,
  UserCheck,
  CreditCard,
  ShieldCheck
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

// Individual nav items with proper icons
const dashboardItems: NavItem[] = [
  {
    title: 'District Dashboard',
    path: '/district-dashboard',
    icon: LayoutDashboard,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'external_worker', 'admin', 'contract']
  },
  {
    title: 'Department Dashboard',
    path: '/department',
    icon: Building,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin', 'contract'],
    requiresDepartmentAccess: true
  },
    {
    title: 'Dharti Aaba Abhiyan', // New Link
    path: '/abhiyan-dashboard', // New Path
    icon: ShieldCheck, // New Icon
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin', 'contract']
  },
  {
    title: 'Department Overview',
    path: '/department-view',
    icon: Eye,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin', 'contract'],
    requiresDepartmentAccess: true
  }
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
    icon: CreditCard,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'government_official', 'admin'],
    requiresDepartmentAccess: true
  },
];

const monitoringItems: NavItem[] = [
  {
    title: 'M&E Dashboard',
    path: '/monitoring',
    icon: TrendingUp,
    roles: ['district_collector', 'additional_collector', 'department_lead', 'admin'],
    requiresDepartmentAccess: true
  },
  {
    title: 'Intelligence',
    path: '/insights',
    icon: PieChart,
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
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    const initialExpanded: string[] = [];
    navSections.forEach(section => {
      if (section.items.some(item => {
          if (item.path === '/' && currentPath === '/') return true;
          return item.path !== '/' && currentPath.startsWith(item.path);
        })) {
        initialExpanded.push(section.title);
      }
    });
    // Ensure "Dashboards" is expanded by default if no other section is active
    if (initialExpanded.length === 0) {
      initialExpanded.push('Dashboards');
    }
    return initialExpanded;
  });

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
    // Section expansion/collapse only works when sidebar is not collapsed
    if (!collapsed) {
      setExpandedSections(prev =>
        prev.includes(sectionTitle)
          ? prev.filter(s => s !== sectionTitle)
          : [...prev, sectionTitle]
      );
    }
  };

  // Filter sections and items based on user's role and department access
  const filteredSections = navSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const hasRoleAccess = user?.role && item.roles.includes(user.role);
      if (!hasRoleAccess) return false;

      if (user?.role === 'admin' || user?.role === 'district_collector') return true;

      if (item.requiresDepartmentAccess) {
        return user?.departmentId !== undefined;
      }

      return true;
    })
  })).filter(section => {
    // Only show sections that have visible items
    if (section.items.length === 0) return false;

    // Check section-level access
    const hasRoleAccess = user?.role && section.roles.includes(user.role);
    if (!hasRoleAccess) return false;

    if (user?.role === 'admin' || user?.role === 'district_collector') return true;

    if (section.requiresDepartmentAccess) {
      return user?.departmentId !== undefined;
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
  const getLinkClassName = (path: string) => {
    const active = isActive(path);
    return cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 group relative",
      active
        ? "bg-sequence-green-500 text-white font-medium shadow-sm"
        : "text-white hover:bg-sequence-teal-600 hover:text-white",
      collapsed && "justify-center w-full"
    );
  };

  // Helper function to get icon class names
  const getIconClassName = (path: string) => {
    const active = isActive(path);
    return cn(
      "h-4 w-4 flex-shrink-0",
      active ? "opacity-100 text-white" : "opacity-80 text-white"
    );
  };

  // Tooltip component for collapsed state
  const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
    <div className="relative group">
      {children}
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 pointer-events-none z-50">
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-2xl text-sm font-medium whitespace-nowrap border border-gray-700">
            {content}
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-gray-700"></div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "border-r bg-sequence-teal-500 text-white transition-all duration-300 ease-in-out flex flex-col h-full",
        collapsed ? "w-[70px]" : "w-64"
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Header Section */}
        <div className="pt-4 pb-2 border-b border-white/10">
          <div>
            <div>
              {/* App Title and Toggle */}
              <div className="mb-4">
                <div className="flex items-center justify-between px-3">
                  {!collapsed && (
                    <h1 className="text-lg font-bold text-white">
                      NitiSetu
                    </h1>
                  )}
                  <button
                    onClick={toggleSidebar}
                    className={cn(
                      "flex items-center justify-center transition-all duration-300 ease-in-out group",
                      collapsed
                        ? "h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 mx-auto"
                        : "h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20"
                    )}
                  >
                    <Tooltip content={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
                      {collapsed ? (
                        <ChevronRightIcon className="h-4 w-4 text-white" />
                      ) : (
                        <ChevronLeft className="h-4 w-4 text-white" />
                      )}
                    </Tooltip>
                  </button>
                </div>
              </div>

              {/* Landing Page Button */}
              <div className="mb-4">
                <div>
                  <Tooltip content="Landing Page">
                    <NavLink
                      to="/"
                      className={getLinkClassName('/')}
                      end
                    >
                      <Home className={getIconClassName('/')} />
                      {!collapsed && (
                        <span className="font-medium">Landing Page</span>
                      )}
                    </NavLink>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Navigation Sections */}
        <div className="flex-1 pt-2">
          <div>
            <div>
              {topSections.map((section) => (
                <div key={section.title} className="mb-2">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm transition-all duration-200 rounded-md group relative",
                      (isSectionActive(section.items) || expandedSections.includes(section.title))
                        ? "bg-sequence-green-500/20 text-white font-medium"
                        : "text-white hover:bg-sequence-teal-600 hover:text-white",
                      collapsed && "justify-center"
                    )}
                  >
                    <Tooltip content={section.title}>
                      <div className="flex items-center gap-3 w-full">
                        <section.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            isSectionActive(section.items) ? "opacity-100" : "opacity-80"
                          )}
                        />
                        {!collapsed && (
                          <>
                            <span className="font-medium flex-1 text-left">{section.title}</span>
                            {expandedSections.includes(section.title) ? (
                              <ChevronDown className="h-4 w-4 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="h-4 w-4 flex-shrink-0" />
                            )}
                          </>
                        )}
                      </div>
                    </Tooltip>
                  </button>

                  {/* Section Items */}
                  {(expandedSections.includes(section.title) || collapsed) && (
                    <div className={cn("mt-1 space-y-1", collapsed ? "" : "ml-6")}>
                      {section.items.map((item) => (
                        <div key={item.path}>
                          <Tooltip content={item.title}>
                            <NavLink
                              to={item.path}
                              className={getLinkClassName(item.path)}
                              end={item.path === '/'}
                            >
                              <item.icon className={getIconClassName(item.path)} />
                              {!collapsed && (
                                <span className="text-sm">{item.title}</span>
                              )}
                            </NavLink>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Data Management and System */}
        <div className="pb-4 border-t border-white/10 pt-4">
          <div>
            <div>
              {bottomSections.map((section) => (
                <div key={section.title} className="mb-2">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm transition-all duration-200 rounded-md group relative",
                      (isSectionActive(section.items) || expandedSections.includes(section.title))
                        ? "bg-sequence-green-500/20 text-white font-medium"
                        : "text-white hover:bg-sequence-teal-600 hover:text-white",
                      collapsed && "justify-center"
                    )}
                  >
                    <Tooltip content={section.title}>
                      <div className="flex items-center gap-3 w-full">
                        <section.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            isSectionActive(section.items) ? "opacity-100" : "opacity-80"
                          )}
                        />
                        {!collapsed && (
                          <>
                            <span className="font-medium flex-1 text-left">{section.title}</span>
                            {expandedSections.includes(section.title) ? (
                              <ChevronDown className="h-4 w-4 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="h-4 w-4 flex-shrink-0" />
                            )}
                          </>
                        )}
                      </div>
                    </Tooltip>
                  </button>

                  {/* Section Items */}
                  {(expandedSections.includes(section.title) || collapsed) && (
                    <div className={cn("mt-1 space-y-1", collapsed ? "" : "ml-6")}>
                      {section.items.map((item) => (
                        <div key={item.path}>
                          <Tooltip content={item.title}>
                            <NavLink
                              to={item.path}
                              className={getLinkClassName(item.path)}
                              end={item.path === '/'}
                            >
                              <item.icon className={getIconClassName(item.path)} />
                              {!collapsed && (
                                <span className="text-sm">{item.title}</span>
                              )}
                            </NavLink>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;