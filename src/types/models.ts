export type Novel = {
  id?: number;
  title: string;
  description: string;
  release_date: string;
  image?: string;
  aliases?: string;
  orig_lang?: string;
};
export type UserData = {
  username: string;
  avatar: string;
  id: number;
};

export type ProfileType = {
  User: {
    username: string;
    avatar: string;
    location: string;
    bio: string;
    createdAt: string;
    headerPhoto: string;
  };
  journalLength: number;
  listsAmount: number;
};
export type novelInfo = {
  id: number;
  title: string;
  image?: string;
};

export type ReviewModelWithUser = {
  content: string;
  User: UserData;
  updatedAt?: string;
};

export type ReviewModelWithNovel = {
  content: string;
  Novel: novelInfo;
  updatedAt?: string;
};
export type ReviewModel = ReviewModelWithNovel | ReviewModelWithUser;

export type JournalEntry = {
  score: number;
  status: statusType;
  started_reading?: number;
  finished_reading?: number;
  Novel: novelInfo;
  comments: string;
};
export type statusType =
  | "reading"
  | "completed"
  | "on-hold"
  | "dropped"
  | "plan to read";
