import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./navbar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
    return <Outlet />;
  }

  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
