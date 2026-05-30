import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/forgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleForgot(e) {
    e.preventDefault();

    try {
      await api.post(
        "/api/v1/auth/forgot-password",
        { email }
      );

      alert("Código enviado!");

    } catch (error) {
      console.log(error.response.data);
    }
  }

  navigate("/reset-password");

  return (
    <div className="container">
    <div className="card-forgot">
      <h1>Esqueci minha senha</h1>
    <form onSubmit={handleForgot}>
      <input
        type="email"
        placeholder="Seu email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
        Recuperar senha
      </button>
    </form>
    </div>
    </div>
  );
}

export default ForgotPassword;