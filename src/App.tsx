import React, {useEffect, useState} from 'react';
import {applyOperation} from "./lib/operation/Operation";
import {User} from "./models/users";
import {getModifiedUsers} from "./app/users";

function App() {
    const [users, setUsers] = useState<User[]>([])
    const operation = getModifiedUsers()

    useEffect(() => {
        (async () => {
            const result = await applyOperation(operation)
            setUsers(result[0])
        })()
    }, [])

    return (
        <div>
            <h2>Пользователи</h2>
            <div>
                {users.map(user => (<div key={user.id}>{user.name}</div>))}
            </div>
        </div>
    );
}

export default App;
