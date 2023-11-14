import {createApplier} from "../base/I";

export namespace cookieService {
  export const applierId = Symbol()
  export const apply = createApplier(applierId)
}
