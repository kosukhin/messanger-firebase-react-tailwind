import { v4 as uuidv4 } from "uuid";
import { HashModel, hashModel } from "./hashModel";
import { defineModelEffect } from "../base/I";

export const hash = defineModelEffect<typeof hashModel, HashModel>(hashModel, async (model) => {
  if (model.type === 'uuid') {
    return hashModel(model, {
      value: uuidv4()
    })
  }

  return model
})
