
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, authMethod } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          <span className="text-nitisetu-500">Niti</span>
          <span className="text-nitisetu-700">Setu</span>
        </CardTitle>
        <CardDescription className="text-center">
          District Administration Dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertDescription>
            <strong>Firebase Setup Required:</strong> Update the Firebase configuration in <code>src/lib/firebase-config.ts</code> with your project credentials. 
            The system will fall back to mock authentication if Firebase is not configured.
          </AlertDescription>
        </Alert>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password (Firebase: nitisetu123, Mock: any text)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-nitisetu-500 hover:bg-nitisetu-600" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p className="mb-2"><strong>Authentication Methods:</strong></p>
          <p className="mb-2 text-xs">• Firebase: Use password "nitisetu123" for all users</p>
          <p className="mb-4 text-xs">• Mock Fallback: Any password will work</p>
          
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="font-medium">District Collector:</div>
              <div>dm@nitisetu.asifabad.com</div>
            </div>
            <div>
              <div className="font-medium">Additional Collector:</div>
              <div>ac@nitisetu.asifabad.com</div>
            </div>
            <div>
              <div className="font-medium">Department Lead:</div>
              <div>dwo@nitisetu.asifabad.com</div>
            </div>
            <div>
              <div className="font-medium">Admin:</div>
              <div>admin@nitisetu.asifabad.com</div>
            </div>
            <div>
              <div className="font-medium">Government Official:</div>
              <div>employee@nitisetu.asifabad.com</div>
            </div>
            <div>
              <div className="font-medium">Contract Worker:</div>
              <div>contractor@nitisetu.asifabad.com</div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
