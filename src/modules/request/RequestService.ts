import {BaseService} from "../base/BaseService";
import {takeInstance} from "../base/I";
import {RequestRepository} from "./RequestRepository";

export class RequestService extends BaseService {
  repositories = [
    takeInstance(RequestRepository)
  ]
}
