import {BaseModel} from "../base/BaseModel";

export class Cookies extends BaseModel {
  constructor(
    readonly key: string,
    readonly operation: 'r' | 'w' | 'd' = 'r',
    readonly value?: string,
    readonly timeout: number = 7
  ) {
    super();
  }
}
