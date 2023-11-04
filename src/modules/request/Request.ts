import {BaseModel} from "../base/BaseModel";

export class Request extends BaseModel {
  static GET = 'get';
  static POST = 'post';
  static PUT = 'put';
  static DELETE = 'delete';

  constructor(readonly url: string, readonly method: string, readonly headers?: Record<string, string>) {
    super()
  }
}
