import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { AuthResponce } from "../types/auth";
import { UserData } from "../types/models";

class AuthStore {
  user: UserData = {} as UserData;
  loggedInStatus: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(newState: boolean) {
    this.loggedInStatus = newState;
  }

  setUser(user: UserData) {
    this.user = user;
  }

  async login(username: string, password: string) {
    try {
      const res = await AuthService.login(username, password);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        this.setAuth(true);
        this.setUser(res.data.user);
      }
      return res.status;
    } catch (e: any) {
      console.log(e.response);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as UserData);
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
}

export default new AuthStore();
