import {defineModelFactory} from "../base/I";

type FirebaseActions = 'add' | 'update' | 'remove' | 'get' | 'list' | 'onCollection' | 'onDocument'

export class FirebaseModel {
  constructor(
    readonly action: FirebaseActions,
    readonly collection: string,
    readonly data: Record<string, any>,
    readonly isDone: boolean,
    readonly result: any,
    readonly id?: string
  ) {
  }
}

export const firebaseModel = defineModelFactory<FirebaseModel>({
  isDone: false,
  result: null,
  data: {}
})
