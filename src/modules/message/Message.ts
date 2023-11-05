import {BaseModel} from "../base/BaseModel";

export class Message extends BaseModel {
  static collectionName = 'messages'
  
  constructor(
    readonly _id: string,
    readonly groupId: string,
    readonly text: string
  ) {
    super();
  }
}
