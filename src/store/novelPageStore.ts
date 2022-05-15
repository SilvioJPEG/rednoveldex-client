import { makeAutoObservable } from "mobx";
import { Novel } from "../typings/models";

class novelStore {
  novel: Novel | null = null;
  inJournal: boolean = false;
  inFavourites: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setEmpty() {
    this.novel = null;
    this.inJournal = false;
    this.inFavourites = false;
  }

  logged(status: boolean) {
    this.inJournal = status;
  }

  favourited(status: boolean) {
    this.inFavourites = status;
  }
  
  setNovel(novelData: Novel) {
    this.novel = novelData;
  }
}

export default new novelStore();
