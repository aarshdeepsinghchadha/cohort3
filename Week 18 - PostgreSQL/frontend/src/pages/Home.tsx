import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className="heading-section">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome to your TODO App!
          </h2>
        </div>
        <div className="button-section flex space-x-4">
          <button
            onClick={() => navigate("/sign-in")}
            className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
