
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";

// Layouts
import AppShell from "@/components/layout/app-shell";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import UploadPage from "./pages/UploadPage";
import TableViewPage from "./pages/TableViewPage";
import DepartmentDashboardPage from "./pages/DepartmentDashboardPage";
import ProjectDashboardPage from "./pages/ProjectDashboardPage";
// New pages
import DepartmentView from "./pages/dashboard/DepartmentView";
import DistrictStats from "./pages/dashboard/DistrictStats";
import DistrictDashboard from "./pages/dashboard/DistrictDashboard";
import InsightsView from "./pages/InsightsView";
import Product from "./pages/Product"

import AnonymousGrievanceForm from './components/forms/AnonymousGrievanceForm'; // Adjust this path
import NitisetuFeedbackForm from './components/forms/NitisetuFeedbackForm';    // Adjust this path

import { AbhiyanDashboardPage } from './pages/AbhiyanDashboardPage'; // New Import

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/anonymous-grievance" element={<AnonymousGrievanceForm />} />
              <Route path="/nitisetu-feedback" element={<NitisetuFeedbackForm />} />


              
              {/* Protected Routes */}
              <Route element={<AppShell />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/table-view" element={<TableViewPage />} />
                <Route path="/department" element={<DepartmentDashboardPage />} />
                <Route path="/project" element={<ProjectDashboardPage />} />
                {/* New Routes */}
                <Route path="/department-view" element={<DepartmentView />} />
                <Route path="/district-stats" element={<DistrictStats />} />
                <Route path="/district-dashboard" element={<DistrictDashboard />} />
                <Route path="/insights" element={<InsightsView />} />
                <Route path="/abhiyan-dashboard" element={<AbhiyanDashboardPage />} /> {/* New Route */}
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
