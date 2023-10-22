import React, {useEffect, useState} from 'react';
import {User} from "./models/users";
import {getModifiedUsers} from "./app/users";
import {applyOperation} from "./operation";

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [usersMap, setUsersMap] = useState<Record<number, User>>({})
  const operation = getModifiedUsers()

  useEffect(() => {
    (async () => {
      const result = await applyOperation(operation)
      const users = result.flat()
      setUsers(users[0])
      setUsersMap(users[1])
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
