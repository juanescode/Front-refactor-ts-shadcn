import axios from "./axios.ts";

interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface AuthResponse {
  id: string;
  username: string;
  email: string;
  token?: string;
}

export const registerRequest = (user: RegisterUser) => 
  axios.post<AuthResponse>("/register", user);

export const loginRequest = (user: LoginUser) => 
  axios.post<AuthResponse>("/login", user);

export const verifyTokenRequest = (token: string) => 
    axios.get(`/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
