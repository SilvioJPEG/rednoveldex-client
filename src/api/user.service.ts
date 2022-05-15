import authStore from "../store/authStore";
import { UserData } from "../typings/models";
import { $api } from "./auth.service";

export default class UsersService {
  static async getUserProfile(username: string): Promise<UserData> {
    const res = await $api.get<UserData>(`/users/${username}`);
    return res.data;
  }
  static async getLoggedInData(username: string) {
    try {
      const res = await $api.get(`/users/retrive/${username}`);
      if (res.status === 200) {
        authStore.setUser(res.data);
        authStore.setAuth(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

}
