import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/v1/auth/login",
        {
          email,
          senha,
        }
      );

      console.log(response.data);

      const token = response.data.data.token;

      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");

      navigate("/profile");

    } catch (error) {
      console.error(error);

      const mensagem =
        error.response?.data?.message ||
        "Erro ao fazer login";

      alert(mensagem);
    }
  }

  return (
    <div className="container">
      <div className="card-login">

        <h1>Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">
            Entrar
          </button>

        </form>

        <br />

        <button
          type="button"
          onClick={() => navigate("/register")}
        >
          Criar conta
        </button>

        <br />
        <br />

        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
        >
          Esqueci minha senha
        </button>

      </div>
    </div>
  );
}

export default Login;