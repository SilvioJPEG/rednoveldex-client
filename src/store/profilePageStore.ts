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
    } else {
      this.setEmpty();
    }
  }

  setReviews(reviews: ReviewModel[]) {
    this.reviews = reviews;
  }

  setFavourites(favourites: BaseNovel[]) {
    this.favourites = favourites;
  }

  setBody(body: "overview" | "lists" | "journal") {
    this.body = body;
  }

  setEmpty() {
    this.User = null;
    this.listsAmount = 0;
    this.journalLength = 0;
    this.reviews = null;
    this.favourites = null;
  }
}

export default new ProfileStore();
