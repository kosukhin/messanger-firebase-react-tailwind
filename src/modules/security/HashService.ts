import {createApplier} from "../base/I";
import {Hash} from "./Hash";

export namespace hashService {
  export const applierId = Symbol()
  export const apply = createApplier<Hash>(applierId)
}
