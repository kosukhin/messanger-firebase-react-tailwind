import {BaseModel} from "../lib/model";
import {takeInstance} from "../lib/I";

type FirebaseActions = 'add' | 'update' | 'remove'

export namespace firebase {
  export namespace models {
    export class Firebase extends BaseModel {
      constructor(
        readonly action: FirebaseActions,
        readonly collection: string,
        readonly data: Record<string, string>,
        readonly id?: string,
        readonly isDone = false
      ) {
        super();
      }
    }

    export const firebase = takeInstance.bind(null, Firebase)
  }
}
