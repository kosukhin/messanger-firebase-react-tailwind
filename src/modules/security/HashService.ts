import {createApplier} from "../base/I";

export namespace hashService {
  export const applierId = Symbol()
  export const apply = createApplier(applierId)
}
