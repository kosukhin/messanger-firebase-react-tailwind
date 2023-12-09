import { v4 as uuidv4 } from "uuid";
import { hashModel } from "./HashModel";

export async function hash(...args: Parameters<typeof hashModel>) {
  const model = hashModel(...args)
  if (model.type === 'uuid') {
    return hashModel(model, {
      value: uuidv4()
    })
  }

  return model
}
