import {v4 as uuidv4} from "uuid";
import {registerApplier} from "../modules/base/I";
import {hashService} from "../modules/security/HashService";
import {Hash} from "../modules/security/Hash";


registerApplier(hashService.applierId, (model: Hash) => {
  if (model.type === 'uuid') {
    return model.takeChanged({
      value: uuidv4()
    })
  }

  return model
})
