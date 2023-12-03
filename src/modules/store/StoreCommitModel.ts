import {defineModelFactory} from "../base/I";

export class StoreCommitModel {
  constructor(readonly action: string, readonly payload?: any) {
  }
}


export const storeCommitModel = defineModelFactory<StoreCommitModel>({
  payload: null
})
