import { Novel } from "../types/models";
import { $api } from "./auth.service";

export default class FavouritesService {
  static async updateFavourites(novel_id: number) {
    const res = await $api.patch(
      `novels/favourites/${novel_id}/update-favourites`
    );
    return res.status;
  }
  static async checkIfFavourited(novel_id: number): Promise<boolean> {
    const res = await $api.get<{ InFavourites: boolean }>(
      `novels/favourites/${novel_id}/check-favourites`
    );
    if (res.status === 200) {
      return res.data.InFavourites;
    } else {
      return false;
    }
  }
  static async getAll(username: string) {
    const res = await $api.get<Novel[]>(`novels/favourites/${username}/all`);
    return res;
  }
}
