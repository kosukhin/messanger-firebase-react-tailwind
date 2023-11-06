import {BaseModel} from "../base/BaseModel";

export class Group extends BaseModel {
  static collectionName = 'groups'

  constructor(
    readonly _id: string,
    readonly id: string,
    readonly name: string
  ) {
    super();
  }
}
