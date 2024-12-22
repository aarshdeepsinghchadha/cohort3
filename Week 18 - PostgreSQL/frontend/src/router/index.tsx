import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../../../frontend/src/pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import TodosHome from "../pages/todos/todosHome";
import Home from "../pages/Home";
import MainLayout from "../components/mainLayout";
import AuthGuard from "./AuthGuard";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route
            path="todos"
            element={
              <AuthGuard>
                <TodosHome />
              </AuthGuard>
            }
          />
        </Route>

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
