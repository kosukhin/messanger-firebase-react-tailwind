import {BaseService} from "../base/BaseService";
import {takeInstance} from "../base/I";
import {CookiesRepository} from "./CookiesRepository";

export class CookiesService extends BaseService {
  repositories = [
    takeInstance(CookiesRepository)
  ]
}
