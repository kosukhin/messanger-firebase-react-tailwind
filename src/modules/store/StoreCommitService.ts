import {createApplier} from "../base/I";

export namespace storeCommitService {
  export const applierId = Symbol()
  export const apply = createApplier(applierId)
}
