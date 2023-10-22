import {operation} from "../lib/operation/Operation";
import {request} from "../models/Request";
import {User} from "../models/users";

const getUsers = () => operation(request('https://jsonplaceholder.typicode.com/users', 'GET'))

export const getModifiedUsers = () => {
  const req = getUsers()
  req.next(addInfoToUsers)
    .next(prependOkToNames)
  return req
}

const addInfoToUsers = (users: User[]) => {
  return users.map((user, index) => {
    return {
      ...user,
      name: `#${index + 1} ${user.name}`
    }
  });
}

const prependOkToNames = (users: User[]) => {
  return users.map((user, index) => {
    return {
      ...user,
      name: `${user.name} - OK`
    }
  });
}
