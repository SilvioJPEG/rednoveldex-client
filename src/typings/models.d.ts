export type UserData = {
  username: string;
  avatar: string;
  id: number;
};

export interface UserFull extends UserData {
  location: string;
  bio: string;
  createdAt: string;
  headerCover: string;
}

export type Profile = {
  User: UserFull;
  journalLength: number;
  listsAmount: number;
  reviews: ReviewModel[];
  favourites: BaseNovel[];
};

export type BaseNovel = {
  id: number;
  title: string;
  image?: string;
  explicit?: boolean;
};

export interface Novel extends BaseNovel {
  description: string;
  release_date: string;
  aliases?: string;
  orig_lang?: string;
}

export type ReviewModelWithUser = {
  id: number;
  content: string;
  User: UserData;
  updatedAt?: string;
  Novel: BaseNovel;
};

export type ReviewModelWithNovel = {
  id: number;
  content: string;
  Novel: BaseNovel;
  updatedAt?: string;
};
export type ReviewModel = ReviewModelWithNovel | ReviewModelWithUser;

export type JournalEntry = {
  score: number;
  status: statusType;
  started_reading?: number;
  finished_reading?: number;
  Novel: BaseNovel;
  comments: string;
};

export interface EditorEntity extends EditorEntityValues {
  Novel: BaseNovel;
}

export type EditorEntityValues = {
  score: number | null;
  status: statusType | null;
  startDate: Date | null;
  finishDate: Date | null;
  comments: string | null;
};

export type statusType =
  | "reading"
  | "completed"
  | "on-hold"
  | "dropped"
  | "plan-to-read";

export type List = {
  id: number;
  name: string;
  description: string;
  novels: BaseNovel[];
};
