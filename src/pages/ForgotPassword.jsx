import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import "../styles/forgotPassword.css";
import forgotImage from "../assets/recover_account.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleForgot(e) {
    e.preventDefault();

    try {
      await api.post("/api/v1/auth/forgot-password", { email });
      showToast("Código enviado para o seu e-mail!", "success");
      navigate("/reset-password");

    } catch (error) {
      showToast(error.response?.data?.message || "Erro ao enviar código", "error");
    }
  }

  return (
    <div className="container">
      <div className="side-image-area">
        <img src={forgotImage} alt="Recuperar conta" className="side-image" />
      </div>

      <div className="card-forgot">
        <div className="card-icon">🔒</div>
        <h1>Esqueci minha senha</h1>
        <p>Insira seu e-mail para receber o código de recuperação.</p>

        <form onSubmit={handleForgot}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">📨 Recuperar senha</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
