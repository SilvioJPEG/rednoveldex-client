import { UserData } from "./models";


export type AuthResponce = {
  accessToken: string;
  refreshToken: string;
  user: UserData;
};
