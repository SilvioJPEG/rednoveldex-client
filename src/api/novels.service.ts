import { $api } from "./auth.service";
import { Novel, novelInfo } from "../types/models";

export default class NovelsService {
  static async getNovelData(id: number): Promise<Novel> {
    const res = await $api.get(`/novels/${id}`);
    return res.data;
  }
  static async searchFor(search: string): Promise<novelInfo[]> {
    const res = await $api.get(`novels/search/${search}`);
    return res.data;
  }

  static async findNovelInVNDB(title: string): Promise<string[]> {
    const res = await $api.post(`/novels/find/${title}`);
    return res.data;
  }

  static async addNovel(title: string): Promise<Novel> {
    const res = await $api.post("/novels/add", { title: title });
    return res.data;
  }

  static async getRecentNovels(amount: number): Promise<novelInfo[]> {
    const res = await $api.get(`/novels/recent/${amount}`);
    return res.data;
  }
}
