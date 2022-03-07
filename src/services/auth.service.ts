import { AxiosResponse } from "axios";
import { AuthResponce } from "../types/auth";

import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5002";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default class AuthService {
  static async login(username: string, password: string) {
    return await $api.post<AuthResponce>("/auth/login", { username, password });
  }
  static async registration(username: string, password: string) {
    return await $api.post<AuthResponce>("/auth/registration", {
      username,
      password,
    });
  }
  static async logout(): Promise<void> {
    return $api.post("/auth/logout");
  }
}

export { API_URL, $api };
