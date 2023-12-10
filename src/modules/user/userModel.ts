import {defineModelFactory} from "../base/I";

export const USERS_COLLECTION = 'users';
export const DEFAULT_NAME = 'Аноним';
export const DEFAULT_AVATAR = 'https://i.pravatar.cc/300';

export type UserModel = {
  _id: string,
  id: string,
  name: string,
  avatar: string
}

export const userModel = defineModelFactory<UserModel>()()
