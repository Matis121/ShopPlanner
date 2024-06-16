import { jwtDecode } from "jwt-decode";

export function auth(token) {
  if (!localStorage.getItem("authToken")) {
    localStorage.setItem("authToken", token);
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}

export function logout() {
  if (localStorage.getItem("authToken")) {
    localStorage.removeItem("authToken");
  }
}

export function getUserId() {
  if (localStorage.getItem("authToken")) {
    const authToken = localStorage.getItem("authToken");
    const { id } = jwtDecode(authToken);
    return id;
  }
}
