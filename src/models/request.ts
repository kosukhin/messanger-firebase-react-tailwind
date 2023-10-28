import {BaseModel} from "../lib/model";
import {takeInstance} from "../lib/I";

export namespace request {
  export namespace constants {
    export const GET = 'get';
    export const POST = 'post';
    export const PUT = 'put';
    export const DELETE = 'delete';
  }

  export namespace model {
    export class Request extends BaseModel {
      constructor(readonly url: string, readonly method: string, readonly headers?: Record<string, string>) {
        super()
      }
    }

    export const request = takeInstance.bind(null, Request)
  }
}
