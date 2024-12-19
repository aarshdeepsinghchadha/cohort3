import axios from "axios";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (
    formData: FormData,
    onSuccess: () => void,
    onError: (message: string) => void
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/signin", formData);
      if (response.status === 200 && response.data.token) {
        sessionStorage.setItem("authToken", response.data.token);
        onSuccess();
      } else {
        onError("Invalid login credentials");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "An error occurred during login";
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
  };

  return { isLoading, signIn, logout };
};
