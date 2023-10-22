import {takeInstance} from "../lib/I";

export class Request {
  constructor(readonly url: string, readonly method: string, readonly headers?: Record<string, string>) {
  }
}

export const request = takeInstance.bind(null, Request)
