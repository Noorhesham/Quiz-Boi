import { API_URL } from "@/constants";
import axios from "axios";
const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req: any) => {
  const jwtCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("jwt="));
  if (jwtCookie) {
    const jwtToken = jwtCookie.split("=")[1];
    req.headers.authorization = `Bearer ${jwtToken}`;
  }
  return req;
});
export const loginGoogle = (accessToken: string) =>API.post("users/login", { googleAccessToken: accessToken })
export const signupGoogle = (accessToken: string) => API.post("users/signup", { googleAccessToken: accessToken });
