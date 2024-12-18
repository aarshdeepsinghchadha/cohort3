import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
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
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded transition"
          >
            Sign In
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
