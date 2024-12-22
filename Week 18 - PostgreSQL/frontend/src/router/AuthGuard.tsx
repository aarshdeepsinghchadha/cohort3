import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = (): boolean => {
    const token = sessionStorage.getItem("authToken");
    return !!token;
};

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const authStatus = isAuthenticated();
    console.log("AuthGuard - isAuthenticated:", authStatus); // Debugging

    if (!authStatus) {
        console.log("User is not authenticated. Redirecting to '/'...");
        return <Navigate to="/" />;
    }

    console.log("User is authenticated. Rendering children.");
    return <>{children}</>;
};

export default AuthGuard;
