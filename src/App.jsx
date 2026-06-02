import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyCode from "./pages/VerifyCode";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ThemeToggle from "./components/ThemeToggle";
import { ToastProvider } from "./contexts/ToastContext";
import "./contexts/Toast.css";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ThemeToggle />
        <Routes>
          <Route path="/"                element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/verify-code"     element={<VerifyCode />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password"  element={<ResetPassword />} />
          <Route path="/profile"         element={<Profile />} />
          <Route path="*"                element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
