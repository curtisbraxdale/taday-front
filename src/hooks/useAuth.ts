import { useState, useEffect } from "react";
import { User } from "@/types";
import { authApi, userApi, ApiError } from "@/lib/api";
import { transformApiUser, transformUserToApi } from "@/lib/transformers";
import { showWin98Toast } from "@/lib/win98-toast";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const loggedInFlag = localStorage.getItem("taday_logged_in");
      if (!loggedInFlag) {
        // Skip refresh if we know user isn't logged in
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      try {
        const apiUser = await userApi.getUser();
        const user = transformApiUser(apiUser);
        localStorage.setItem("taday_user", JSON.stringify(user));
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        try {
          await authApi.refreshToken();
          const apiUser = await userApi.getUser();
          const user = transformApiUser(apiUser);
          localStorage.setItem("taday_user", JSON.stringify(user));
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (refreshError) {
          localStorage.removeItem("taday_user");
          localStorage.removeItem("taday_logged_in");
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const apiUser = await authApi.login(email, password);
      const user = transformApiUser(apiUser);

      // Save user data to localStorage for persistence
      localStorage.setItem("taday_user", JSON.stringify(user));
      localStorage.setItem("taday_logged_in", "true");

      // Update state immediately to trigger re-render
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          showWin98Toast("Invalid email or password", "error");
        } else {
          showWin98Toast("Login failed. Please try again.", "error");
        }
      } else {
        showWin98Toast("Network error. Please check your connection.", "error");
      }
      return false;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): Promise<boolean> => {
    try {
      const apiUserData = transformUserToApi(data);
      const apiUser = await userApi.createUser(apiUserData);
      const user = transformApiUser(apiUser);

      // Save user data to localStorage for persistence
      localStorage.setItem("taday_user", JSON.stringify(user));
      localStorage.setItem("taday_logged_in", "true");

      // Update state immediately to trigger re-render
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          showWin98Toast(
            "Email already exists. Please use a different email.",
            "error",
          );
        } else {
          showWin98Toast("Registration failed. Please try again.", "error");
        }
      } else {
        showWin98Toast("Network error. Please check your connection.", "error");
      }
      return false;
    }
  };

  const updateUser = async (userData: {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
  }): Promise<boolean> => {
    try {
      const apiUserData = {
        username: userData.name,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone,
      };

      // Remove undefined values
      Object.keys(apiUserData).forEach((key) => {
        if (apiUserData[key as keyof typeof apiUserData] === undefined) {
          delete apiUserData[key as keyof typeof apiUserData];
        }
      });

      const updatedApiUser = await userApi.updateUser(apiUserData);
      const updatedUser = transformApiUser(updatedApiUser);

      // Update localStorage
      localStorage.setItem("taday_user", JSON.stringify(updatedUser));

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }));

      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          showWin98Toast(
            "Email already exists. Please use a different email.",
            "error",
          );
        } else {
          showWin98Toast(
            "Failed to update profile. Please try again.",
            "error",
          );
        }
      } else {
        showWin98Toast("Network error. Please check your connection.", "error");
      }
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      await userApi.deleteUser();

      // Clear user data
      localStorage.removeItem("taday_user");
      localStorage.removeItem("taday_logged_in");
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });

      showWin98Toast("Account deleted successfully", "success");

      // Auto-refresh page after 1 second to redirect to auth
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        showWin98Toast("Failed to delete account. Please try again.", "error");
      } else {
        showWin98Toast("Network error. Please check your connection.", "error");
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Even if logout API fails, we should still clear local state
      console.warn("Logout API call failed:", error);
    } finally {
      // Clear user data and update state immediately
      localStorage.removeItem("taday_user");
      localStorage.removeItem("taday_logged_in");
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });

      showWin98Toast("Successfully logged out!", "success");

      // Auto-refresh page after 1 second to redirect to auth
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return {
    ...authState,
    login,
    register,
    updateUser,
    deleteAccount,
    logout,
  };
};