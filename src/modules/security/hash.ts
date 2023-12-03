import {hashModel, HashModel} from "./HashModel";
import {v4 as uuidv4} from "uuid";

export async function hash(model: HashModel) {
  if (model.type === 'uuid') {
    return hashModel(model, {
      value: uuidv4()
    })
  }

  return model
}
