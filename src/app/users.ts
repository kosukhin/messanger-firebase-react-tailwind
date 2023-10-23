import {operation} from "../lib/operation/Operation";
import {request} from "../models/request";
import {User} from "../models/users";
import {getUsersUrl} from "../constants/users";
import {methodGet} from "../constants/request";

const getUsers = () => operation(request(getUsersUrl, methodGet))

export const getModifiedUsers = () => {
  const req = getUsers()
  req
    .then(addInfoToUsers)
    .then(prependOkToNames)
  req
    .then(getDetailForUsers)
    .then(buildUsersMap)

  return req
}

const getDetailForUsers = (users: User[]) => {
  return users.map((user: User) => {
    return operation(request(`https://jsonplaceholder.typicode.com/users/${user.id}`, 'GET'))
  })
}

const buildUsersMap = (users: User[]): Record<number, User> => {
  return users.reduce((acc: any, item) => {
    acc[item.id] = item
    return acc;
  }, {});
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
