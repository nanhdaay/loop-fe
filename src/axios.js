import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://loop-be.onrender.com/api/",
  withCredentials: true
});
