export type Novel = {
  title: string;
  id: number;
  description: string;
  release_date: string;
  image?: string;
};
export type UserData = {
  id: number;
  username: string;
  avatar: string;
  bio: string;
};
export interface novelInfo {
  id: number;
  title: string;
  poster: string;
}

export type ReviewModel = {
  content: string;
  user: UserData;
  novel_id: number;
};
export type JournalEntry = {
  title: string;
  id: number;
  description: string;
  release_date: string;
  score: number;
  status: string;
  started_reading: number;
  finished_reading: number;
  image?: string;
}