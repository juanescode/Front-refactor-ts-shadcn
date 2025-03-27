import { AuthResponse, LoginUser, RegisterUser } from "../types/Auth.types.tsx";
import axios from "./axios.ts";

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
  
