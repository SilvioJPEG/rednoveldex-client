import { makeAutoObservable } from "mobx";
import {
  BaseNovel,
  EditorEntityValues,
  JournalEntry,
  Novel,
} from "../typings/models";

type openEditorArgs =
  | { entity: JournalEntry; type: "edit" }
  | { entity: Novel; type: "add" };

class EditorStore {
  baseNovelInfo: BaseNovel | null = null;
  entity: JournalEntry | null = null;
  opened: boolean = false;
  type: "add" | "edit" = "edit";
  constructor() {
    makeAutoObservable(this);
  }

  openEditor(args: openEditorArgs) {
    this.opened = true;
    this.type = args.type;
    if (args.type === "edit") {
      this.entity = args.entity;
    }
    if (args.type === "add") {
      this.baseNovelInfo = args.entity;
    }
  }

  closeEditor() {
    this.type = "add";
    this.entity = null;
    this.opened = false;
    this.baseNovelInfo = null;
  }

  getInitialValues(): EditorEntityValues {
    if (this.entity) {
      const editInitialValues: EditorEntityValues = {
        status: this.entity.status,
        score: this.entity.score,
        startDate: this.entity.started_reading
          ? new Date(this.entity.started_reading)
          : null,
        finishDate: this.entity.finished_reading
          ? new Date(this.entity.finished_reading)
          : null,
        comments: this.entity.comments,
      };
      return editInitialValues;
    }
    return {
      status: null,
      score: null,
      startDate: null,
      finishDate: null,
      comments: null,
    };
  }
}

export default new EditorStore();
