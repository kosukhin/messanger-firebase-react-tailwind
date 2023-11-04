import {Applier, BaseRepository} from "../base/BaseRepository";
import {Hash} from "./Hash";
import {v4 as uuidv4} from "uuid";

export class HashRepository extends BaseRepository {
  registerApplier(): Applier {
    return ['Hash', (model: Hash) => {
      if (model.type === 'uuid') {
        return model.takeChanged({
          value: uuidv4()
        })
      }

      return model
    }]
  }
}
