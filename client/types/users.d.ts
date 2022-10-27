export type UserType = {
  id: string;
  nickName: string;
};

export interface UsersType {
  [key: string]: UserType;
}
