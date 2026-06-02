import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import PasswordInput from "../components/PasswordInput";
import "../styles/register.css";
import registerImage from "../assets/create_account.png";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post("/api/v1/auth/register", { nome, email, senha });
      await api.post("/api/v1/auth/send-code", { email });
      console.log(response.data);
      showToast("Cadastro realizado! Verifique seu e-mail.", "success");
      navigate("/verify-code");

    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DADOS:", error.response?.data);
      showToast(error.response?.data?.message || "Erro ao cadastrar", "error");
    }
  }

  return (
    <div className="container-register">
      <div className="side-image-area">
        <img src={registerImage} alt="Criar conta" className="side-image" />
      </div>

      <div className="card-register">
        <div className="card-icon">🚀</div>
        <h1>Criar Conta</h1>
        <p className="subtitle">Preencha os dados abaixo para se cadastrar.</p>

        <form onSubmit={handleRegister}>
          <div className="field">
            <label>Nome</label>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Senha</label>
            <PasswordInput
              placeholder="Mínimo 8 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit">✅ Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
