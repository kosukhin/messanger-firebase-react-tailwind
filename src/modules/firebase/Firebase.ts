import {BaseModel} from "../base/BaseModel";

type FirebaseActions = 'add' | 'update' | 'remove'

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
