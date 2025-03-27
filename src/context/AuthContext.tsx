import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import Cookies from "js-cookie";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import { AuthContextType, User } from "../types/Auth.types";


interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
        return;
      }

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: string } }).response?.data ===
          "string"
      ) {
        setErrors([(error as { response: { data: string } }).response.data]);
        return;
      }

      setErrors(["An unexpected error occurred"]);
    }
  };

  const signin = async (userData: { email: string; password: string }) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
        return;
      }

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: string } }).response?.data ===
          "string"
      ) {
        setErrors([(error as { response: { data: string } }).response.data]);
        return;
      }

      setErrors(["An unexpected error occurred"]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, user, isAuthenticated, errors, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
