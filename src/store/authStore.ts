import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/auth.service";
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
        this.setUser(res.data.user);
        this.setAuth(true);
      }
      console.log(this.user);
      return res.status;
    } catch (e: any) {
      console.log(e.response);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      Cookies.remove("access_token");
      Cookies.remove("signed_as");
      this.setUser({} as UserData);
      this.setAuth(false);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async register(username: string, password: string) {
    try {
      const res = await AuthService.registration(username, password);
      this.setUser(res.data.user);
      this.setAuth(true);
      return res;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}

export default new AuthStore();
