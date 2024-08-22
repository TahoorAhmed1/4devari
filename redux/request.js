import axios from "axios";

// const BASE_URL = `http://localhost:8080/api`;
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || `https://4devari-api.vercel.app/api`;

const request = axios.create({ baseURL: BASE_URL });

export { request, BASE_URL };
