import { makeAutoObservable } from "mobx";
import { JournalEntry, Novel } from "../typings/models";

class novelStore {
  novel: Novel | null = null;
  inJournal: JournalEntry | null = null;
  inFavourites: boolean = false;
  averageScore: number | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setEmpty() {
    this.novel = null;
    this.inJournal = null;
    this.inFavourites = false;
    this.averageScore = null;
  }

  journaled(InJournal: boolean, novelEntry: JournalEntry) {
    if (InJournal) {
      this.inJournal = novelEntry;
    } else {
      this.inJournal = null;
    }
  }

  favourited(status: boolean) {
    this.inFavourites = status;
  }

  setNovel(novelData: Novel) {
    this.novel = novelData;
  }

  setAverageScore(score: number) {
    this.averageScore = score;
  }
}

export default new novelStore();
