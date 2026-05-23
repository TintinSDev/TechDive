// app/lib/auth.ts

import { api } from "./api";
import { User } from "./types";

export async function login(email: string, password: string) {
  try {
    const response = await api.login(email, password);
    return {
      success: true,
      user: response.user,
      token: response.token,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }
}

export async function signup(email: string, password: string, name?: string) {
  try {
    const response = await api.signup(email, password, name);
    return {
      success: true,
      user: response.user,
      token: response.token,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Signup failed",
    };
  }
}

export async function logout() {
  api.logout();
}

export async function getUser(): Promise<User | null> {
  try {
    const user = await api.getMe();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
