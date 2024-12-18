import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (formData: FormData, onSuccess: () => void) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", formData);
      if (response.status === 201) {
        toast.success("Sign up successful! Redirecting to Sign In...");
        onSuccess();
      }
    } catch (error) {
      toast.error("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signUp };
};
