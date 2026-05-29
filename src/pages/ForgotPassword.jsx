import { useState } from "react";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

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

  return (
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
  );
}

export default ForgotPassword;