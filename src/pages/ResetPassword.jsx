import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/resetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleForgot(e) {
    e.preventDefault();

    // Validação simples antes de enviar para poupar requisições inválidas
    if (senha.length < 8) {
      alert("A nova senha deve ter no mínimo 8 caracteres.");
      return;
    }

    try {
      // Ajustado de "/api/v1/..." para "/v1/..." presumindo que sua 'api' base URL já termina em /api/prova
      await api.post(
        "api/v1/auth/reset-password",
        { email, codigo, senha }
      );

      alert("Senha redefinida com sucesso!");

    } catch (error) {
      console.error(error);
      // Exibe a mensagem de erro vinda da API se houver
      const msgErro = error.response?.data?.message || "Erro ao redefinir senha.";
      alert(msgErro);
    }
  }
      navigate("/reset-password");

  return (
    <div className="container">
    <div className="card-reset">
      <h1>Redefinir Senha</h1>

    <form onSubmit={handleForgot} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
      
      <label>E-mail:</label>
      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Código de Verificação:</label>
      <input
        type="text"
        placeholder="Digite o código de 6 dígitos"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        required
      />

      <label>Nova Senha (mín. 8 caracteres):</label>
      <input
        type="password"
        placeholder="Digite a nova senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <button type="submit">
        Redefinir Senha
      </button>
    </form>
    </div>
    </div>
  );
}

export default ResetPassword;