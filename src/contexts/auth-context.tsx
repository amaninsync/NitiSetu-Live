
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { mockUsers } from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";
import { 
  signInWithFirebase, 
  signOutFromFirebase, 
  initializeFirebaseUsers,
  AuthResult 
} from "@/lib/firebase-auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  authMethod: 'firebase' | 'mock';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState<'firebase' | 'mock'>('firebase');
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("nitisetu-user");
    const savedAuthMethod = localStorage.getItem("nitisetu-auth-method") as 'firebase' | 'mock' || 'firebase';
    
    if (!savedUser) return;

    try {
      const parsedUser: User = JSON.parse(savedUser);

      // Basic shape validation
      if (parsedUser?.email && parsedUser?.role && Array.isArray(parsedUser?.permissions)) {
        setUser(parsedUser);
        setIsAuthenticated(true);
        setAuthMethod(savedAuthMethod);
      } else {
        throw new Error("Invalid user format");
      }
    } catch (error) {
      console.error("Failed to load saved user:", error);
      localStorage.removeItem("nitisetu-user");
      localStorage.removeItem("nitisetu-auth-method");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Initialize Firebase users on mount
  useEffect(() => {
    const initUsers = async () => {
      try {
        await initializeFirebaseUsers();
        console.log('Firebase users initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Firebase users:', error);
      }
    };

    initUsers();
  }, []);

  const loginWithFirebase = async (email: string, password: string): Promise<boolean> => {
    const result: AuthResult = await signInWithFirebase(email, password);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
      setAuthMethod('firebase');
      localStorage.setItem("nitisetu-user", JSON.stringify(result.user));
      localStorage.setItem("nitisetu-auth-method", 'firebase');

      toast({
        title: "Login successful",
        description: `Welcome back, ${result.user.name} (Firebase)`,
      });

      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Firebase login failed",
        description: result.error || "Authentication failed",
      });
      return false;
    }
  };

  const loginWithMock = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    const foundUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setAuthMethod('mock');
      localStorage.setItem("nitisetu-user", JSON.stringify(foundUser));
      localStorage.setItem("nitisetu-auth-method", 'mock');

      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name} (Mock)`,
      });

      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Mock login failed",
        description: "Invalid email or password",
      });
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Try Firebase authentication first
    try {
      const firebaseSuccess = await loginWithFirebase(email, password);
      if (firebaseSuccess) {
        return true;
      }
    } catch (error) {
      console.error('Firebase authentication failed, falling back to mock:', error);
    }

    // Fall back to mock authentication
    return await loginWithMock(email, password);
  };

  const logout = async () => {
    try {
      if (authMethod === 'firebase') {
        await signOutFromFirebase();
      }
    } catch (error) {
      console.error('Firebase logout error:', error);
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("nitisetu-user");
    localStorage.removeItem("nitisetu-auth-method");

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === "admin" || user.role === "district_collector") return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        hasPermission,
        authMethod,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
