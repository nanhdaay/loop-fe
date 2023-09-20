import axios from "axios"

export const makeRequest = axios.create({
    baseURL:"http://localhost:6868/api/",
    withCredentials: true,
});