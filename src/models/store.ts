import {BaseModel} from "../lib/model";
import {takeInstance} from "../lib/I";

export namespace store {
  export class Commit extends BaseModel {
    constructor(readonly action: string, payload?: any) {
      super();
    }
  }

  export const commit = takeInstance.bind(null, Commit)
}
