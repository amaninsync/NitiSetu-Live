
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import LoginForm from '@/components/auth/login-form';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/district-dashboard" replace />; {/* Updated redirect path */}
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="text-nitisetu-500">Niti</span>
          <span className="text-nitisetu-700">Setu</span>
        </h1>
        <p className="text-muted-foreground text-center">
          Empowering District Administration
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
