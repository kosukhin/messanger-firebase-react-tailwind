import {createApplier} from "../base/I";

export namespace requestService {
  export const applierId = Symbol()
  export const apply = createApplier(applierId)
}
