import {defineModelFactory} from "../base/I";

type FirebaseActions = 'add' | 'update' | 'remove' | 'get' | 'list' | 'onCollection' | 'onDocument'

export type FirebaseModel = {
  action: FirebaseActions,
  collection: string,
  data: any,
  isDone: boolean,
  result: any,
  id?: string
}

export const firebaseModel = defineModelFactory<FirebaseModel>()({
  isDone: false as boolean,
  result: null,
  data: {}
})
