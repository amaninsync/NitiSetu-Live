
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Building2, 
  Home, 
  LineChart, 
  Menu, 
  X,
  Lightbulb,
  Map,
  PieChart,
  HandCoins,
  Stethoscope,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({
    '/dashboard/district': false,
    '/dashboard/projects': false,
    '/dashboard/monitoring': false
  });
  
  // Define the nested menu structure
  const navItems = [
    { 
      path: '/dashboard/district', 
      label: 'District View', 
      icon: <Home size={18} />,
      children: [
        { path: '/dashboard/district-stats', label: 'District Stats', icon: <PieChart size={18} /> }
      ]
    },
    { 
      path: '/dashboard/health-data', 
      label: 'Health Data', 
      icon: <Stethoscope size={18} /> 
    },
    { 
      path: '/dashboard/projects', 
      label: 'Projects', 
      icon: <LineChart size={18} />,
      children: [
        { path: '/dashboard/shg-financing', label: 'SHG Financing', icon: <HandCoins size={18} /> }
      ]
    },
    { 
      path: '/dashboard/departments', 
      label: 'Departments', 
      icon: <Building2 size={18} /> 
    },
    { 
      path: '/dashboard/monitoring', 
      label: 'Monitoring & Evaluation', 
      icon: <BarChart3 size={18} />,
      children: [
        { path: '/dashboard/road-network', label: 'Road Network', icon: <Map size={18} /> }
      ]
    },
    { 
      path: '/dashboard/insights', 
      label: 'Insights', 
      icon: <Lightbulb size={18} /> 
    },
  ];

  // Toggle expand/collapse for parent items
  const toggleExpand = (path: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Check if a route is active (either exact match or a child route)
  const isRouteActive = (path: string) => {
    // Check if it's a direct match
    if (location.pathname === path) {
      return true;
    }
    
    // Check if any child route is active
    const item = navItems.find(item => item.path === path);
    if (item && item.children) {
      return item.children.some(child => child.path === location.pathname);
    }
    
    return false;
  };

  // Render menu items recursively
  const renderNavItem = (item: any, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.path];
    // const isActive = isRouteActive(item.path); // isActive was defined but not used
    
    return (
      <li key={item.path}>
        <Link
          to={item.path}
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            location.pathname === item.path
              ? 'bg-primary text-primary-foreground' // Updated to use primary theme colors
              : 'text-gray-700 hover:bg-gray-200'
          } ${depth > 0 ? 'ml-4' : ''}`}
          onClick={(e) => {
            if (hasChildren) {
              // Only prevent default if we're toggling via the button
              const target = e.target as HTMLElement;
              if (target.tagName === 'BUTTON' || target.closest('button')) {
                // This click is on the button, allow toggleExpand to handle it
              } else {
                // Click is on the link itself, allow navigation
              }
            }
          }}
        >
          <span className="mr-2">{item.icon}</span>
          <span className="flex-grow">{item.label}</span>
          {hasChildren && (
            <button
              className={`p-1 rounded-full ${
                location.pathname === item.path
                  ? 'text-white hover:bg-blue-700' // Consider primary theme colors
                  : 'hover:bg-gray-300'
              }`}
              onClick={(e) => toggleExpand(item.path, e)}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
        </Link>
        
        {hasChildren && isExpanded && (
          <ul className="mt-1 mb-2">
            {item.children.map((child: any) => renderNavItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 mr-4"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="text-primary font-heading font-bold text-xl">NitiSetu</Link> {/* Updated to use primary color */}
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm">
            <option>Kumaram Bheem Asifabad District</option>
          </select>
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"> {/* Updated to use primary theme colors */}
            <span className="text-sm font-medium">AD</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden`}
        >
          <nav className="py-6 px-4 h-full">
            <ul className="space-y-1">
              {navItems.map((item) => renderNavItem(item))}
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
