import { useNavigate } from "react-router";
import type { LoginCredentials, SignupCredentials } from "@/types/auth";
import {
  getCurrentUser,
  isAuthenticated,
  loginUser,
  logoutUser,
  signupUser,
} from "@/services/authService";

export function useAuth() {
  const navigate = useNavigate();

  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  const login = (data: LoginCredentials) => {
    const success = loginUser(data);

    if (success) {
      navigate("/dashboard");
    }

    return success;
  };

  const signup = (data: SignupCredentials) => {
    signupUser(data);
    navigate("/login");
  };

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return {
    user,
    authenticated,
    login,
    signup,
    logout,
  };
}