import { makeAutoObservable } from "mobx";
import { BaseNovel, Profile, ReviewModel, UserFull } from "../typings/models";

class ProfileStore {
  User: UserFull | null = null;
  listsAmount: number = 0;
  journalLength: number = 0;
  favourites: BaseNovel[] | null = null;
  reviews: ReviewModel[] | null = null;
  body: "overview" | "lists" | "journal" = "overview";

  constructor() {
    makeAutoObservable(this);
  }

  setProfile(data: Profile | null) {
    if (data) {
      this.User = data.User;
      this.listsAmount = data.listsAmount;
      this.journalLength = data.journalLength;
      this.setReviews(data.reviews);
      this.setFavourites(data.favourites);
    }
  }

  setReviews(reviews: ReviewModel[]) {
    this.reviews = reviews;
  }

  setFavourites(favourites: BaseNovel[]) {
    this.favourites = favourites;
  }
}

export default new ProfileStore();
