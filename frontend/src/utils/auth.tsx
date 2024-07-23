// TODO: refactor types

import { jwtDecode } from "jwt-decode";

export function auth(token: string) {
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
    const authToken: any = localStorage.getItem("authToken");
    const { id }: any = jwtDecode(authToken);
    return id;
  }
}
