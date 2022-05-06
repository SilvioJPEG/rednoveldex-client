import { $api } from "./auth.service";
import { Novel, novelInfo } from "../types/models";
import novelStore from "../store/novelPageStore";

export default class NovelsService {
  static async getNovelData(id: number) {
    const res = await $api.get<Novel>(`/novels/${id}`);
    novelStore.setNovel(res.data);
  }
  static async searchFor(search: string): Promise<novelInfo[]> {
    const res = await $api.get<novelInfo[]>(`novels/search/${search}`);
    return res.data;
  }

  static async findNovelInVNDB(title: string): Promise<string[]> {
    const res = await $api.post<string[]>(`/novels/find/${title}`);
    return res.data;
  }

  static async addNovel(title: string): Promise<Novel> {
    const res = await $api.post<Novel>("/novels/add", { title: title });
    return res.data;
  }

  static async getRecentNovels(amount: number): Promise<novelInfo[]> {
    const res = await $api.get<novelInfo[]>(`/novels/recent/${amount}`);
    return res.data;
  }
}
