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
  id: number;
  username: string;
  avatar: string;
  bio: string;
  journalLength: number;
  listsAmount: number;
};
export interface novelInfo {
  id: number;
  title: string;
  image?: string;
}

export type ReviewModel = {
  content: string;
  User: UserData;
  Novel: novelInfo;
};
export type JournalEntry = {
  score: number;
  status: string;
  started_reading: number;
  finished_reading: number;
  Novel: novelInfo;
};
