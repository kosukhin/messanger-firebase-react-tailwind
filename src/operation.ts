import {buildOperationApplier} from "./lib/operation/buildOperationApplier";
import {Request} from "./models/Request";

export const {applyOperation} = buildOperationApplier({
  Request: async (model: Request) => {
    const response = await fetch(model.url, {
      method: model.method,
      headers: model.headers
    })
    return await response.json();
  }
})
