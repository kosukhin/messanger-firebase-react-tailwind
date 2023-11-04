import {takeSingleton} from "./I";
import {CookiesService} from "../browser/CookiesService";
import {FirebaseService} from "../firebase/FirebaseService";
import {HashService} from "../security/HashService";
import {StoreCommitService} from "../store/StoreCommitService";
import {RequestService} from "../request/RequestService";
import {ProfileService} from "../profile/ProfileService";

export function takeServices() {
  return {
    get cookies() {
      return takeSingleton(CookiesService).setup()
    },
    get firebase() {
      return takeSingleton(FirebaseService).setup()
    },
    get hash() {
      return takeSingleton(HashService).setup()
    },
    get storeCommit() {
      return takeSingleton(StoreCommitService).setup()
    },
    get request() {
      return takeSingleton(RequestService).setup()
    },
    get profile() {
      return takeSingleton(ProfileService).setup()
    }
  }
}