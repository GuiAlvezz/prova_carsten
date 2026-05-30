import axios from "axios";

const api = axios.create({

  baseURL:
    "https://api.carsten.com.br/api/prova",

  headers: {
  Authorization:
  "Bearer pk_fe0f94c09ae9662751ba9f0244a90c3025ef329c6c56bb4f"}

});

export default api;