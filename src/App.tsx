import React, {useEffect, useState} from 'react';
import {User} from "./models/users";
import {getModifiedUsers} from "./app/users";
import {apply} from "./operation";
import {flatten} from "./lib/operation/Operation";

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [usersMap, setUsersMap] = useState<Record<number, User>>({})
  const getUsers = getModifiedUsers()

  useEffect(() => {
    (async () => {
      const [items, itemsMap] = await apply(getUsers)
      setUsers(flatten(items))
      setUsersMap(flatten(itemsMap)[0])
    })()
  }, [])

  return (
    <div>
      <h2>Пользователи</h2>
      <div>
        {users.map(user => (
          <div key={user.id}>
            <div>{user.name}</div>
            <blockquote>
              <div>
                {usersMap[user.id].email}
              </div>
              <div>
                {usersMap[user.id].phone}
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
