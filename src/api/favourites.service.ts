import novelPageStore from "../store/novelPageStore";
import { Novel } from "../typings/models";
import { $api } from "./auth.service";

export default class FavouritesService {
  static async updateFavourites(novel_id: number) {
    const res = await $api.patch<boolean>(`novels/favourites/${novel_id}`);
    novelPageStore.favourited(res.data);
  }
  static async checkIfFavourited(novel_id: number) {
    const res = await $api.get<{ InFavourites: boolean }>(
      `novels/favourites/${novel_id}`
    );
    if (res.status === 200) {
      novelPageStore.favourited(res.data.InFavourites);
    } else {
      novelPageStore.favourited(false);
    }
  }
  static async getAll(username: string) {
    const res = await $api.get<Novel[]>(`novels/favourites/${username}/all`);
    return res;
  }
}
