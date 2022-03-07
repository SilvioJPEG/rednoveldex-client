import { Review } from "../types/models";
import { $api } from "./auth.service";

export default class ReviewService {
  static async addReview(novel_id: number, content: string) {
    const res = await $api.post("/reviews", { novel_id: novel_id, content: content });
    return res;
  }
  static async deleteReview(novel_id: number) {
    const res = await $api.delete(`/reviews/${novel_id}`);
    return res;
  }
  static async updateReview(novel_id: number, content: string) {
    const res = $api.patch("/reviews", {
      novel_id: novel_id,
      content: content,
    });
    return res;
  }
  static async getReviews(novel_id: number): Promise<Review[]> {
    let amount = 4;
    const res = await $api.get(`/reviews/${novel_id}/${amount}`);
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }

  }
}
