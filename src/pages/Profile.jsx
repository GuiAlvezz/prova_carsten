import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/profile.css";

const MOCK_USER = {
  nome: "Guilherme Alves",
  email: "guilherme@email.com",
  id: "USR-00421",
  email_verificado: true,
};

function Profile() {
  const [user, setUser] = useState(MOCK_USER);
  const navigate = useNavigate();

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/api/v1/user/me", {
        headers: { "X-Access-Token": token },
      });

      setUser(response.data.data);
    } catch {
      // token expirado — mantém dados mock
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar-wrapper">
            <span className="avatar">👨‍💻</span>
            <span className="avatar-badge">✓</span>
          </div>
          <h1>{user.nome}</h1>
          <span className="email">📧 {user.email}</span>
          <span className="role-badge">Desenvolvedor Front-end</span>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <span>🪪 ID do Usuário</span>
            <strong>{user.id}</strong>
          </div>
          <div className="info-item">
            <span>🔐 Status da Conta</span>
            <strong className={user.email_verificado ? "status-ok" : "status-pending"}>
              {user.email_verificado ? "✅ Verificado" : "⏳ Pendente"}
            </strong>
          </div>
          <div className="info-item">
            <span>📅 Membro desde</span>
            <strong>Janeiro 2025</strong>
          </div>
          <div className="info-item">
            <span>🕐 Último acesso</span>
            <strong>Hoje</strong>
          </div>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h2>12</h2>
            <p>🗂️ Projetos</p>
          </div>
          <div className="stat-box">
            <h2>38</h2>
            <p>🔑 Logins</p>
          </div>
          <div className="stat-box">
            <h2>100%</h2>
            <p>🛡️ Segurança</p>
          </div>
        </div>

        <div className="buttons">
          <button className="btn-password" onClick={() => navigate("/forgot-password")}>
            🔒 Alterar Senha
          </button>
          <button className="btn-logout" onClick={logout}>
            🚪 Sair
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
