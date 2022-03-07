import { $api } from "./auth.service";
import { novelInfo } from "../types/models";


export default class NovelsService {

  static async getNovelData(id: number) {
    const res = await $api.get(`/novels/${id}`)
    if (res.status === 200) {
      return res.data;
    }
  }
  static async searchFor(search: string): Promise<novelInfo[]> {
    const res = await $api.get(`novels/search/${search}`);
    return res.data;
  }
}
