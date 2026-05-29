import { useState } from "react";
import api from "../services/api";

await api.post(
  "/api/v1/auth/register",
  {
    name,
    email,
    password
  }
);

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/v1/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Usuário cadastrado!");
      console.log(response.data);

    } catch (error) {
      console.log(error.response.data);
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div>
      <h1>Cadastro</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Register;