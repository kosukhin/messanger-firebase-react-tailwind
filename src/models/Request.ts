import {takeInstance} from "../lib/operation/I";
import {BaseModel} from "../lib/operation/BaseModel";

export class Request extends BaseModel {
  constructor(readonly url: string, readonly method: string, readonly headers?: Record<string, string>) {
    super()
  }
}

export const request = takeInstance.bind(null, Request)
