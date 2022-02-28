export type UserType = {
    username: string;
    id: string;
}
export type AuthResponce = {
    accessToken: string;
    refreshToken: string;
    user: UserType;
}
