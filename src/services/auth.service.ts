import { AxiosResponse } from "axios";
import { AuthResponce } from "../types/auth";

import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:5002";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const authInterceptor = (config: AxiosRequestConfig) => {
  if (config.headers)
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$api.interceptors.request.use(authInterceptor);

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
    return $api.post("/auth/logout");
  }

}

export {API_URL, $api}
