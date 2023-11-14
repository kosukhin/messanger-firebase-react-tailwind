import {createApplier} from "../base/I";
import {Cookies} from "./Cookies";

export namespace cookieService {
  export const applierId = Symbol()
  export const apply = createApplier<Cookies>(applierId)
}
