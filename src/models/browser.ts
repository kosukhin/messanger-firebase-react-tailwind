import {BaseModel} from "../lib/model";
import {takeInstance} from "../lib/I";

export namespace browser {
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

  export const cookies = takeInstance.bind(null, Cookies)
}
