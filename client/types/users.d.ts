export type UserType = {
  id: string;
  nickName: string;
};

export interface UsersType {
  [x: string]: UserType;
  find: Function;
}
