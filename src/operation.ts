import {buildOperationApplier} from "./lib/operation/buildOperationApplier";
import {Request} from "./models/request";

export const {apply} = buildOperationApplier({
  Request: async (model: Request) => {
    const response = await fetch(model.url, {
      method: model.method,
      headers: model.headers
    })
    return await response.json();
  }
})
