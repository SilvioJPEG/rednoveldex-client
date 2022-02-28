import { AxiosResponse } from "axios";
import { AuthResponce } from "./models";

import axios, { AxiosRequestConfig } from "axios";

export const API_URL = "http://localhost:5000";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers)
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponce>> {
    return $api.post<AuthResponce>("/auth/login", { username, password });
  }
  static async registration(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponce>> {
    return $api.post<AuthResponce>("/auth/registration", {
      username,
      password,
    });
  }
  static async logout(): Promise<void> {
    return $api.post("/api/auth/logout");
  }
}
