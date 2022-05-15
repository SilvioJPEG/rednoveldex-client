import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import AuthService from "../api/auth.service";
import { UserData } from "../typings/models";

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

  async login(user: UserData) {
    this.setUser(user);
    this.setAuth(true);
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

}

export default new AuthStore();
