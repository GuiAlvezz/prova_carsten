import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

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
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>

      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;