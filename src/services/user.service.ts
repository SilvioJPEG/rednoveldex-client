import authStore from "../store/authStore";
import { UserData } from "../types/models";
import { $api } from "./auth.service";

export default class UsersService {
  static async getUserProfile(username: string): Promise<UserData> {
    const res = await $api.get(`/users/${username}`);
    return res.data;
  }
  static async getLoggedInProfileData(username: string) {
    try {
      const res = await $api.get(`/users/retrive/${username}`);
      if (res.status === 200) {
        await authStore.setUser(res.data);
        authStore.setAuth(true);
      }
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteUser() {
    const res = $api.delete(`/users/`);
    return res;
  }
}
