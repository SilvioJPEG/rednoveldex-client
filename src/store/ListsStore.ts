import { makeAutoObservable } from "mobx";

class ListsStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new ListsStore();
