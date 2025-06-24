import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context'; // Corrected: changed '=' to 'from'
import MetricCard from '@/components/dashboard/metric-card';
import BudgetChart from '@/components/dashboard/budget-chart';
import PerformanceChart from '@/components/dashboard/performance-chart';
import ProjectStatusChart from '@/components/dashboard/project-status-chart';
import { mockDistrictMetrics } from '@/lib/mock-data';
import { CalendarIcon, ArrowRight, Home } from 'lucide-react'; // Added Home icon
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    // Main container with increased padding and consistent max-width
    <div className="space-y-8 max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Product Page Header */}
      <header className="bg-white rounded-lg shadow-sm py-4 px-6 mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sequence-teal-700">Welcome</h1>
        <Link to="/" className="flex-shrink-0">
          <Button variant="outline" size="sm" className="space-x-2">
            <Home className="h-4 w-4" />
            <span>Go to Landing Page</span>
          </Button>
        </Link>
      </header>

      {/* Hero Section with Greeting */}
      <div className="bg-gradient-to-r from-sequence-teal-500 to-sequence-teal-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between mb-8"> {/* Reduced p-8 to p-6 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"> {/* Reduced text size from 3xl/4xl to 2xl/3xl, mb-2 to mb-1 */}
            Hello, {user?.name || 'User'}!
          </h2>
          <p className="text-sm opacity-90"> {/* Reduced text size from lg to sm */}
            Welcome to the District Dashboard. Here's a summary of your key metrics and activities.
          </p>
        </div>
        <div className="hidden md:flex items-center text-xs bg-white/20 px-3 py-1.5 rounded-md"> {/* Reduced text size from sm to xs, px-4 to px-3 */}
          <CalendarIcon className="h-3 w-3 mr-2" /> {/* Reduced icon size from h-4/w-4 to h-3/w-3 */}
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Dashboard navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">
        {/* Navigation links updated to use button-like styling for consistency */}
        <Link to="/department">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer p-4"> {/* Added p-4 */}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Department Dashboard
                <ArrowRight className="h-4 w-4 text-sequence-teal-500" /> {/* Added color */}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2"> {/* Adjusted padding */}
              <p className="text-sm text-muted-foreground">
                View department-wise performance, budgets, and projects
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/project">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Project Dashboard
                <ArrowRight className="h-4 w-4 text-sequence-teal-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                Track progress, timelines, and resources for all district projects
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/table-view">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Reports & Data
                <ArrowRight className="h-4 w-4 text-sequence-teal-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                Access and manage all district reports and data tables
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/department-view">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Departments View
                <ArrowRight className="h-4 w-4 text-sequence-teal-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                Detailed department listings and performance metrics
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/district-stats">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                District Statistics
                <ArrowRight className="h-4 w-4 text-sequence-teal-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                View population, revenue, and demographic statistics
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/district-dashboard">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                District Dashboard
                <ArrowRight className="h-4 w-4 text-sequence-teal-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                Comprehensive district data with export options
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* New Buttons for Grievances and Feedback - now consistently styled */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link to="/anonymous-grievance" className="flex-1">
          <Button className="w-full h-12 text-base">Submit Anonymous Grievance</Button> {/* Consistent height and font-size */}
        </Link>
        <Link to="/nitisetu-feedback" className="flex-1">
          <Button variant="outline" className="w-full h-12 text-base">Nitisetu Queries & Feedback</Button> {/* Consistent height and font-size */}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {mockDistrictMetrics.map((metric) => (
          // MetricCard is assumed to have its own consistent styling, ensuring shadow-sm as used.
          <MetricCard key={metric.id} metric={metric} className="shadow-sm" />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts are assumed to have their own consistent styling */}
        <BudgetChart />
        <ProjectStatusChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        {/* Recent Activity Card - ensure it matches card design language */}
        <Card> {/* Changed from div to Card for consistent styling */}
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle> {/* Changed h3 to CardTitle */}
          </CardHeader>
          <CardContent className="pt-2"> {/* Adjusted padding */}
            <div className="space-y-6">
              <ActivityItem 
                title="Budget allocation for Q3 approved"
                time="2 hours ago"
              />
              <ActivityItem 
                title="Rural Road Connectivity project updated"
                time="5 hours ago"
              />
              <ActivityItem 
                title="Monthly department reports submitted"
                time="Yesterday"
              />
              <ActivityItem 
                title="New user accounts created for Health department"
                time="2 days ago"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, time }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1.5 rounded-full bg-primary/10 p-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
};

export default Dashboard;
