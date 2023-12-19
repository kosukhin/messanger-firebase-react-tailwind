import { v4 as uuidv4 } from "uuid";
import { defineModelEffect } from "../base/I";
import { hashModel } from "./hashModel";

export const hash = defineModelEffect()(hashModel, (model) => {
  if (model.type === 'uuid') {
    return hashModel(model, {
      value: uuidv4()
    })
  }

  return model
})
