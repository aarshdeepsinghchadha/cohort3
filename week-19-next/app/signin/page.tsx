"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await axios.post("/api/v1/signin", {
        username,
        password,
      });
  
      if (response.status === 200) {
        console.log(response.data.message); 
        localStorage.setItem("user", JSON.stringify(response.data.user)); 
        router.push("/home"); 
      } else {
        setError(response.data.message || "Sign-in failed"); 
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("An unexpected error occurred");
    }
  };

  
  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col space-y-4">
        <div className="text-2xl text-red-600">{error}</div>
        <button
          className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          onClick={() => {
            window.location.reload(); // Refresh the page
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }
  
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
        {error && <p className="text-red-600">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSignIn}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
