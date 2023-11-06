import {BaseService} from "../base/BaseService";
import {takeServices} from "../base/takeServices";
import {User} from "./User";
import {FirebaseCrud} from "../firebase/FirebaseService";

export class UserService extends BaseService {
  crud: FirebaseCrud<any>

  constructor() {
    super();
    const {firebase} = takeServices()
    this.crud = firebase.buildCrud(User.collectionName)
  }
}
