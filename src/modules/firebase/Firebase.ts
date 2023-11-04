import {BaseModel} from "../base/BaseModel";

type FirebaseActions = 'add' | 'update' | 'remove' | 'get' | 'list' | 'onCollection' | 'onDocument'

export class Firebase extends BaseModel {
  constructor(
    readonly action: FirebaseActions,
    readonly collection: string,
    readonly data: Record<string, any>,
    readonly id?: string,
    readonly isDone = false,
    readonly result: any = null
  ) {
    super();
  }
}
