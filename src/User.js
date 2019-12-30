import React, {useState, useEffect} from 'react'

export default function User(props) {
    const [user, setUser] = useState(null)

    async function fetchUserData(id) {
        const response = await fetch('/' + id)
        setUser(await response.json())
    }

    useEffect(()=>{
        fetchUserData(props.id)
    },[props.id])

    return (
        <details>
            <summary>{user.name}</summary>
            <strong>{user.age}</strong> 岁
            <br />
            住在 {user.address}
        </details>
    )
}