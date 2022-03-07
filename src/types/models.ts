export type Novel = {
  title: string;
  id: number;
  description: string;
  releaseDate: Date;
  image?: string;
};
export type UserData = {
  username: string;
  avatar: string;
};
export interface novelInfo {
  id: number;
  title: string;
  poster: string;
}

export type Review = {
  content: string;
  user: UserData;
};
