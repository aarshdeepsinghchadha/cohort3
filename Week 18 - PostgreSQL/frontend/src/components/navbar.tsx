import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faSignOutAlt, faList } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faList} className="mr-2" /> Todo:
        </button>

        <ul className="flex space-x-4 text-sm">
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white shadow-2xl rounded font-bold text-sm hover:text-indigo-300 hover:bg-zinc-900 px-4 py-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6" /> {/* Logout Icon */}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="text-white shadow-2xl rounded font-bold text-sm hover:text-indigo-300 hover:bg-zinc-900 px-4 py-2"
                >
                  <FontAwesomeIcon icon={faUser} className="w-6 h-6" /> {/* Sign Up Icon */}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/sign-in")}
                  className="text-white shadow-2xl rounded font-bold text-sm hover:text-indigo-300 hover:bg-zinc-900 px-4 py-2"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="w-6 h-6" /> {/* Sign In Icon */}
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
