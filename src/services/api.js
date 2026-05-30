import axios from "axios";

const api = axios.create({

  baseURL:
    "https://api.carsten.com.br/api/prova",

  headers: {
  Authorization:
  "Bearer pk_e902ba0f45aa9305ba5830026a726fd8f5deaf703c0e971b"}

});

export default api;