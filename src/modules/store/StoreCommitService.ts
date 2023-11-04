import {BaseService} from "../base/BaseService";
import {takeInstance} from "../base/I";
import {StoreCommitRepository} from "./StoreCommitRepository";

export class StoreCommitService extends BaseService {
  repositories = [
    takeInstance(StoreCommitRepository)
  ]
}
