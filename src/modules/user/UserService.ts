import {BaseService} from "../base/BaseService";
import {takeServices} from "../base/takeServices";
import {User} from "./User";
import {FirebaseCrud} from "../firebase/FirebaseService";
import {takeInstance} from "../base/I";

export class UserService extends BaseService {
  crud: FirebaseCrud<any>

  constructor() {
    super();
    const {firebase} = takeServices()
    this.crud = firebase.buildCrud(User.collectionName)
  }

  async currentUser() {
    const {profile} = takeServices()
    const userId = await profile.userId()
    return takeInstance(User, '', String(userId.value), User.defaultName, User.defaultAvatar)
  }
}
