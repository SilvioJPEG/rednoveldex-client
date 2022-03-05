import { $api } from "./auth.service";

export default class ReviewService {
  static async addReview(novel_id: number, content: string) {
    const res = $api.post("/reviews", { novelId: novel_id, content: content });
    return res;
  }
  static async deleteReview(novel_id: number) {
    const res = $api.delete(`/reviews/${novel_id}`);
    return res;
  }
  static async updateReview(novel_id: number, content: string) {
    const res = $api.patch("/reviews", { novelId: novel_id, content: content });
    return res;
  }
}
