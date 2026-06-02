import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../contexts/ToastContext";
import "../styles/verifyCode.css";
import verifyImage from "../assets/verify_account.png";

function VerifyCode() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  async function handleVerify(e) {
    e.preventDefault();

    try {
      await api.post("/api/v1/auth/validate-code", { email, codigo });
      showToast("Conta validada com sucesso!", "success");
      navigate("/");

    } catch (error) {
      showToast(error.response?.data?.message || "Erro ao validar código", "error");
    }
  }

  return (
    <div className="container-verify">
      <div className="side-image-area">
        <img src={verifyImage} alt="Verificar conta" className="side-image" />
      </div>

      <div className="card-verify">
        <div className="card-icon">✉️</div>
        <h1>Verificar Conta</h1>
        <p>Digite o código enviado para o seu e-mail.</p>

        <form onSubmit={handleVerify}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔑</span>
            <input
              type="text"
              placeholder="Digite o código recebido"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <button type="submit">✅ Validar Código</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyCode;
