import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Map, BarChart2, Landmark, Stethoscope } from 'lucide-react';


const navItems = [
  { path: '/', label: 'Dashboard', icon: home },
  { path: '/road-network', label: 'Road Network', icon: map },
  { path: '/district-stats', label: 'District Stats', icon: barChart2 },
  { path: '/shg-financing', label: 'SHG Financing', icon: landmark },
  { path: '/health-data', label: 'Health Data', icon: stethoscope },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      <nav className="w-64 bg-white border-r p-4">
        <div className="space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;