export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  email: string;
  token?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: string[];
  signup: (user: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signin: (user: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}
