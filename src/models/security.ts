import {BaseModel} from "../lib/model";
import {takeInstance} from "../lib/I";

export namespace security {
  export namespace constants {
    export const hashUuid = 'uuid';
  }

  export class Hash extends BaseModel {
    constructor(readonly type: string = constants.hashUuid) {
      super();
    }
  }

  export const hash = takeInstance.bind(null, Hash)
  
  export class Uuid extends BaseModel {
    constructor(readonly value: string) {
      super();
    }
  }
}
