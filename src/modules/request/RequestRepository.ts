import {Applier, BaseRepository} from "../base/BaseRepository";
import {Request} from "./Request";

export class RequestRepository extends BaseRepository {
  registerApplier(): Applier {
    return ['Request', (model: Request) => {
      console.log(Request)
    }]
  }
}
