import { makeAutoObservable } from "mobx";
import { List } from "../typings/models";

class ListsStore {
  lists: List[] | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setLists(lists: List[] | null) {
    this.lists = lists;
  }
}

export default new ListsStore();
