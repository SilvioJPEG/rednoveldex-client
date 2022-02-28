import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { AuthResponce, UserType } from "../services/models";

class AuthStore {
  user = {} as UserType;
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(newState: boolean) {
    this.isAuth = newState;
  }

  setUser(user: UserType) {
    this.user = user;
  }

  async login(username: string, password: string) {
    try {
      const res = await AuthService.login(username, password);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as UserType);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async register(username: string, password: string) {
    try {
      const res = await AuthService.registration(username, password);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
      return res;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const res = await axios.get<AuthResponce>("/login", {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e: any) {}
  }
}

export default new AuthStore();
