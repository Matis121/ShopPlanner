import { jwtDecode } from "jwt-decode";

// Define the structure of the decoded JWT payload
interface JwtPayload {
  id: string;
  username?: string;
  exp?: number;
  [key: string]: any;
}

const AUTH_TOKEN_KEY = "authToken";

// Store the auth token in localStorage
export function auth(token: string): void {
  if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

// Check if the user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

// Remove the auth token from localStorage
export function logout(): void {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

// Get the user ID from the auth token
export function getUserId(): string | null {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    try {
      const decoded: JwtPayload = jwtDecode(authToken);
      return decoded.id;
    } catch (error) {
      console.error("Failed to decode auth token:", error);
      return null;
    }
  }
  return null;
}
