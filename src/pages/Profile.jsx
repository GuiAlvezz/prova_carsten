import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/api/v1/user/me",
        {
          headers: {
            "X-Access-Token": token,
          },
        }
      );

      setUser(response.data.data);

    } catch (error) {
      console.log(error.response?.data);

      alert("Erro ao carregar perfil");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container">
      <div className="card-profile">

        <h1>Meu Perfil</h1>

        <div className="avatar">
          👤
        </div>

        <div className="info">
          <p>
            <strong>Nome:</strong> {user.nome || user.name}
          </p>

          <p>
            <strong>E-mail:</strong> {user.email}
          </p>

          <p>
            <strong>ID:</strong> {user.id}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {user.email_verificado
              ? "Verificado"
              : "Não Verificado"}
          </p>
        </div>

        <div className="actions">
          <button
            onClick={() => navigate("/reset-password")}
          >
            Alterar Senha
          </button>

          <button
            onClick={logout}
            className="logout-btn"
          >
            Sair
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;