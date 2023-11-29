import {Hash} from "./Hash";
import {v4 as uuidv4} from "uuid";
import {change} from "../base/I";

export async function hashEffect(model: Hash) {
  if (model.type === 'uuid') {
    return change(model, {
      value: uuidv4()
    })
  }

  return model
}
