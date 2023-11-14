import {registerApplier} from "../modules/base/I";
import {requestService} from "../modules/request/RequestService";
import {Request} from "../modules/request/Request";


registerApplier(requestService.applierId, (model: Request) => {
  console.log(Request)
})
