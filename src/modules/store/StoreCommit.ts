import {BaseModel} from "../base/BaseModel";

export class StoreCommit extends BaseModel {
  constructor(readonly action: string, readonly payload?: any) {
    super();
  }
}
