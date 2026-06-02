import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-code">404</div>
        <div className="notfound-divider" />
        <h1>Página não encontrada</h1>
        <p>A rota que você tentou acessar não existe ou foi removida.</p>
        <button className="notfound-btn" onClick={() => navigate("/")}>
          🏠 Voltar para o início
        </button>
      </div>
    </div>
  );
}

export default NotFound;
