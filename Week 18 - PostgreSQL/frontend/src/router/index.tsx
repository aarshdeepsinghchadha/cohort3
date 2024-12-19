import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../../../frontend/src/pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import TodosHome from "../pages/todos/todosHome";
import Home from "../pages/Home";
import MainLayout from "../components/MainLayout"; // Import MainLayout

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define MainLayout for certain routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* Default home route */}
          <Route path="/todos" element={<TodosHome />} />
        </Route>

        {/* Routes outside MainLayout */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
