import { $api } from "./auth.service";

export default class FavouritesService {
  static async updateFavourites(novel_id: number) {
    const res = await $api.patch(
      `novels/favourites/${novel_id}/update-favourites`
    );
    return res;
  }
  static async checkIfFavourited(novel_id: number) {
    const res = await $api.get(
      `novels/favourites/${novel_id}/check-favourites`
    );
    if (res.status === 200) {
      return res.data;
    } else {
      return false;
    }
  }
  static async getAll(username: string) {
    const res = await $api.get(`novels/favourites/${username}/all`);
    return res;
  }
}
