import {BaseModel} from "../base/BaseModel";

export class User extends BaseModel {
  static collectionName = 'users';
  
  constructor(
    readonly _id: string,
    readonly id: string,
    readonly name: string,
    readonly avatar: string
  ) {
    super();
  }
}
