import { Profile } from "../typings/models";
import { $api } from "./auth.service";

export default class AppService {
  static async getProfileData(username: string) {
    const res = await $api.get<Profile>(`/api/profile/${username}`);
    return res.data;
  }

  static async getNovelPageData(novel_id: number) {
    const res = await $api.get(`/api/novel/${novel_id}`);
    return res.data;
  }

  static async getHomePageData() {
    const res = await $api.get("/api/home");
    return res.data;
  }
}
