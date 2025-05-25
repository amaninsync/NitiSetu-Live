import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { mockUsers } from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("nitisetu-user");
    if (!savedUser) return;

    try {
      const parsedUser: User = JSON.parse(savedUser);

      // Basic shape validation (adapt as needed)
      if (parsedUser?.email && parsedUser?.role && Array.isArray(parsedUser?.permissions)) {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        throw new Error("Invalid user format");
      }
    } catch (error) {
      console.error("Failed to load saved user:", error);
      localStorage.removeItem("nitisetu-user");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    const foundUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem("nitisetu-user", JSON.stringify(foundUser));

      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}`,
      });

      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("nitisetu-user");

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
