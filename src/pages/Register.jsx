import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/v1/auth/register",
        {
          nome,
          email,
          senha,
        }
      );

      console.log(response.data);

      alert("Usuário cadastrado!");

      navigate("/verify-code");

    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DADOS:", error.response?.data);
      console.log("ERRO COMPLETO:", error);

      alert(
        error.response?.data?.message ||
        "Erro ao cadastrar"
      );
    }
  }

  return (
    <div className="container">
    <div className="card-register">
      <h1>Cadastro</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </form>
      </div>
    </div>
  );
}

export default Register;