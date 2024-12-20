// components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("authToken");

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  const handleNavigate = () => {
    if (isAuthenticated) {
      navigate("/todos");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 p-4 text-white z-10">
      <nav className="flex justify-between items-center">
        <button
          onClick={handleNavigate} 
          className="text-white shadow-2xl rounded font-bold text-2xl hover:text-indigo-300 hover:bg-zinc-900 px-4 py-2"
        >
          Todo App
        </button>

        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white shadow-2xl rounded font-bold text-2xl hover:text-indigo-300 hover:bg-zinc-900 px-4 py-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="text-white shadow-2xl rounded font-bold text-2xl hover:text-indigo-300 hover:bg-zinc-900 px-4 py-2"
                >
                  Sign Up
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/sign-in")}
                  className="text-white shadow-2xl rounded font-bold text-2xl hover:text-indigo-300 hover:bg-zinc-900 px-4 py-2"
                >
                  Sign In
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
