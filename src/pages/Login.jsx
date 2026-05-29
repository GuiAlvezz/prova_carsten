import { useState } from "react";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response = await api.post(
        "/api/v1/auth/login",
        {
          email,
          senha
        }
      );

      console.log(response.data);

      const token =
        response.data.data.token;

      localStorage.setItem(
        "token",
        token
      );

      alert("Login realizado!");

    } catch (error) {

      console.log(error.response.data);

      alert("Erro no login");

    }
  }

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Entrar
        </button>

      </form>

    </div>
  );
}

export default Login;