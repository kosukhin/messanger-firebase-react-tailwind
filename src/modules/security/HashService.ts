import {BaseService} from "../base/BaseService";
import {takeInstance} from "../base/I";
import {HashRepository} from "./HashRepository";

export class HashService extends BaseService {
  repositories = [
    takeInstance(HashRepository)
  ]
}
