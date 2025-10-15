import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateGroup from "./pages/CreateGroup";
import GroupPage from "./pages/GroupPage";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on Landing page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/group/:id" element={<GroupPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </div>
  );
}
