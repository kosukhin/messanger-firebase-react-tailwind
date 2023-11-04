import {BaseModel} from "../base/BaseModel";

export class StoreCommit extends BaseModel {
  constructor(readonly action: string, payload?: any) {
    super();
  }
}
