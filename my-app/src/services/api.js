import axios from "axios";

const api = axios.create({
  baseURL: "https://fullplans.appspot.com/",
});

export default api;
