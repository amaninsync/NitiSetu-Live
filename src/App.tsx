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
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected Routes */}
              <Route element={<AppShell />}>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/table-view" element={<TableViewPage />} />
                <Route path="/department" element={<DepartmentDashboardPage />} />
                <Route path="/project" element={<ProjectDashboardPage />} />
                {/* Other routes will be added here */}
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
