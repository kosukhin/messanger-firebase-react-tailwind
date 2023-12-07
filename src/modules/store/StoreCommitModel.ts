import {defineModelFactory} from "../base/I";

export type StoreCommitModel = Readonly<{
  action: string,
  payload?: any
}>

export const storeCommitModel = defineModelFactory<StoreCommitModel>()({
  payload: null as any
})
