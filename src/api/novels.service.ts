import { $api } from "./auth.service";
import { Novel, BaseNovel } from "../typings/models";
import novelStore from "../store/novelPageStore";

export default class NovelsService {
  static async getNovelData(id: number) {
    const res = await $api.get<Novel>(`/novels/${id}`);
    if (Object.keys(res.data).length !== 0) {
      novelStore.setNovel(res.data);
    } else {
      novelStore.setEmpty();
    }
  }
  static async searchFor(search: string): Promise<BaseNovel[]> {
    const res = await $api.get<BaseNovel[]>(`/novels/search/${search}`);
    return res.data;
  }

  static async findNovelInVNDB(title: string): Promise<string[]> {
    const res = await $api.post<string[]>(`/novels/${title}`);
    return res.data;
  }

  static async addNovel(title: string): Promise<Novel> {
    const res = await $api.post<Novel>("/novels/add", { title: title });
    return res.data;
  }

  static async getRecentNovels(amount: number): Promise<BaseNovel[]> {
    const res = await $api.get<BaseNovel[]>(`/novels/recent/${amount}`);
    return res.data;
  }
}
