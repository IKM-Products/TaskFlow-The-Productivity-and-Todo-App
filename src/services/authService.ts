import type { User } from "@/types/user";
import type { LoginCredentials, SignupCredentials } from "@/types/auth";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/services/localStorage";

const USER_KEY = "taskflow_user";
const AUTH_KEY = "taskflow_auth";

export function signupUser(data: SignupCredentials): User {
  const user: User = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    password: data.password,
    joinedAt: new Date().toISOString(),
  };

  setStorageItem(USER_KEY, user);
  return user;
}

export function loginUser(data: LoginCredentials): boolean {
  const user = getStorageItem<User | null>(USER_KEY, null);

  if (!user) return false;

  const isValid =
    user.email === data.email && user.password === data.password;

  if (isValid) {
    setStorageItem(AUTH_KEY, true);
  }

  return isValid;
}

export function logoutUser(): void {
  removeStorageItem(AUTH_KEY);
}

export function getCurrentUser(): User | null {
  return getStorageItem<User | null>(USER_KEY, null);
}

export function isAuthenticated(): boolean {
  return getStorageItem<boolean>(AUTH_KEY, false);
}