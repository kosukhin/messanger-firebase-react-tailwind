import {operation} from "../lib/operation";
import {request} from "../models/request";
import Request = request.model.Request;

operation.registerApplier('Request', (request: Request) => {
  console.log(Request)
})
