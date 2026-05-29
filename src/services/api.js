import axios from "axios";

const api = axios.create({

  baseURL:
    "https://api.carsten.com.br/api/prova",

  headers: {
    Authorization:
      "Bearer SEU_TOKEN_PK"
  }

});

export default api;