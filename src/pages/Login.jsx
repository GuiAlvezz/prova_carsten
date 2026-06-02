import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../contexts/ToastContext";
import PasswordInput from "../components/PasswordInput";
import "../styles/login.css";
import loginImage from "../assets/login_img.png";

function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/api/v1/auth/login", { email, senha });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      showToast("Login realizado com sucesso!", "success");
      navigate("/profile");

    } catch (error) {
      showToast(error.response?.data?.message || "Erro ao fazer login", "error");
    }
  }

  return (
    <div className="login-container">
      <div className="login-image-area">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>

      <div className="login-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        <div className="actions">
          <button type="button" className="btn-secondary" onClick={() => navigate("/register")}>
            Criar Conta
          </button>
          <button type="button" className="btn-link" onClick={() => navigate("/forgot-password")}>
            Esqueci minha senha
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
