import { ReviewModel } from "../typings/models";
import { $api } from "./auth.service";

type updatedReview = {
  id: number;
  content: string;
};

export default class ReviewService {
  static async addReview(novel_id: number, content: string) {
    const res = await $api.post("/reviews", {
      params: {
        novel_id: novel_id,
        content: content,
      },
    });
    return res.data;
  }

  static async deleteReview(review_id: number): Promise<boolean> {
    const res = await $api.delete(`/reviews/${review_id}`);
    return res.status === 200;
  }

  static async updateReview(
    updatedReview: updatedReview
  ): Promise<ReviewModel> {
    const res = await $api.patch<ReviewModel>(
      `/reviews/${updatedReview.id}`,
      updatedReview
    );
    return res.data;
  }

  static async getReviews(
    novel_id: number,
    amount?: number
  ): Promise<ReviewModel[]> {
    const res = await $api.get<ReviewModel[]>("/reviews", {
      params: { novel_id, amount },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  }

  static async getReviewsByUser(username: string): Promise<ReviewModel[]> {
    const res = await $api.get(`/reviews/${username}`);
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  }

  static async getLatestReviews(): Promise<ReviewModel[]> {
    const res = await $api.get<ReviewModel[]>("/reviews");
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  }

  static async checkIfAlready(novel_id: number): Promise<ReviewModel> {
    const res = await $api.get<ReviewModel>(`reviews/check`, {
      params: { novel_id },
    });
    return res.data;
  }
}
