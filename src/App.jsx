import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyCode from "./pages/VerifyCode";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Tela inicial */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Cadastro */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Validação do código após cadastro */}
        <Route
          path="/verify-code"
          element={<VerifyCode />}
        />

        {/* Recuperação de senha */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Redefinição da senha */}
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Área autenticada */}
        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;