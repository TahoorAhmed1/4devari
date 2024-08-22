import axios from "axios";

// const BASE_URL = `http://localhost:8080/api`;
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:8080/api`;

const request = axios.create({ baseURL: BASE_URL });

export { request, BASE_URL };
