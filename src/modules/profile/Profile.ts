import {BaseModel} from "../base/BaseModel";

export class Profile extends BaseModel {
  static cookieIdKey = 'uid';
  static cookieLifeTime = 68000;

}
