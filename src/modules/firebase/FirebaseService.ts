import {BaseService} from "../base/BaseService";
import {takeSingleton} from "../base/I";
import {FirebaseRepository} from "./FirebaseRepository";

export class FirebaseService extends BaseService {
  repositories = [
    takeSingleton(FirebaseRepository)
  ]
}
