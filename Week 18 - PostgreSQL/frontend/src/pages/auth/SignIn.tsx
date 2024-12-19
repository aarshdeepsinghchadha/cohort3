import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/useSignIn";
import toast, { Toaster } from "react-hot-toast";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, isLoading } = useSignIn();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    signIn(
      formData,
      () => {
        toast.success("Successfully signed in!");
        navigate("/todos");
      },
      (errorMessage) => {
        toast.error(errorMessage);
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center rounded-2xl shadow-2xl">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              name="password"
              value = {formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded transition"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-2 text-center text-sm/6 text-gray-500">
          <a
            onClick={() => navigate("/")}
            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Back to home?
          </a>
          <a
            onClick={() => navigate("/sign-up")}
            className="ml-4 font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Create account?
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
