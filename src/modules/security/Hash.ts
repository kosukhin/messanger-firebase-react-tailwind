import {BaseModel} from "../base/BaseModel";

export class Hash extends BaseModel {
  static hashUuid = 'uuid';

  constructor(
    readonly type: string = Hash.hashUuid,
    readonly value: string = ''
  ) {
    super();
  }
}
