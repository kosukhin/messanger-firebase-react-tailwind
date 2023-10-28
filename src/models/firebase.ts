import {BaseModel} from "../lib/model";

export namespace firebase {
  export namespace models {
    export class Firebase extends BaseModel {
      constructor(readonly action: string) {
        super();
      }
    }
  }
}
