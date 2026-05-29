import { useState } from "react";
import api from "../services/api";

function VerifyCode() {

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

      alert("Conta verificada!");

    } catch (error) {

      console.log(error.response.data);

      alert("Código inválido");

    }
  }

  return (
    <div>

      <h1>Validar código</h1>

      <form onSubmit={handleVerify}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Código"
          onChange={(e) =>
            setCodigo(e.target.value)
          }
        />

        <button type="submit">
          Validar
        </button>

      </form>

    </div>
  );
}

export default VerifyCode;