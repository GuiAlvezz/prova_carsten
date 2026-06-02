import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import PasswordInput from "../components/PasswordInput";
import "../styles/resetPassword.css";
import resetImage from "../assets/recover_account.png";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleReset(e) {
    e.preventDefault();

    if (senha.length < 8) {
      showToast("A nova senha deve ter no mínimo 8 caracteres.", "warning");
      return;
    }

    try {
      await api.post("api/v1/auth/reset-password", { email, codigo, senha });
      showToast("Senha redefinida com sucesso!", "success");
      navigate("/");

    } catch (error) {
      showToast(error.response?.data?.message || "Erro ao redefinir senha.", "error");
    }
  }

  return (
    <div className="container">
      <div className="side-image-area">
        <img src={resetImage} alt="Redefinir senha" className="side-image" />
      </div>

      <div className="card-reset">
        <div className="card-icon">🔐</div>
        <h1>Redefinir Senha</h1>
        <p>Preencha os campos abaixo para criar uma nova senha.</p>

        <form onSubmit={handleReset}>
          <label>E-mail</label>
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

          <label>Código de Verificação</label>
          <div className="input-group">
            <span className="input-icon">🔑</span>
            <input
              type="text"
              placeholder="Código de 6 dígitos"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <label>Nova Senha</label>
          <PasswordInput
            placeholder="Mínimo 8 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">✅ Redefinir Senha</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
