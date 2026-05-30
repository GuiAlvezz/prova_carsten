import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/verifyCode.css";

function VerifyCode() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  async function handleVerify(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/v1/auth/validate-code",
        {
          email,
          codigo
        }
      );

      console.log(response.data);

      alert("Conta validada com sucesso!");

      navigate("/");

    } catch (error) {
      console.error(error);

      const mensagem =
        error.response?.data?.message ||
        "Erro ao validar código";

      alert(mensagem);
    }
  }

  return (
    <div className="container">
      <div className="card-verify">
        <h1>Validar Código</h1>

      <form onSubmit={handleVerify}>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Digite o código recebido"
          value={codigo}
          onChange={(e) =>
            setCodigo(e.target.value)
          }
          required
        />

        <button type="submit">
          Validar Código
        </button>

      </form>
      </div>
    </div>
  );
}

export default VerifyCode;