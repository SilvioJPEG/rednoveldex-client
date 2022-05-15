import { AuthResponce } from "../typings/auth";
import axios from "axios";
import authStore from "../store/authStore";

const API_URL = "http://localhost:5002";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default class AuthService {
  static async login(username: string, password: string) {
    const res = await $api.post<AuthResponce>("/auth/login", {
      username,
      password,
    });
    if (res.status === 200) {
      authStore.login(res.data.user);
    }
  }

  static async registration(username: string, password: string) {
    const res = await $api.post<AuthResponce>("/auth/registration", {
      username,
      password,
    });
    if (res.status === 201) {
      authStore.login(res.data.user);
    }
  }
  static async logout(): Promise<void> {
    return $api.post("/auth/logout");
  }
}

export { API_URL, $api };
