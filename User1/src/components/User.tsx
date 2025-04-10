import axios from 'axios'
import React, { useEffect, useState } from 'react'

const User = () => {
    const [users, setUsers] = useState([])
    const fetchUsers = async()=>{
        const res = await axios.get('https://dummyjson.com/users')
        console.log(res.data.users);
        setUsers(res.data.users)
    }
    useEffect(()=>{
        fetchUsers()
    },[])
  return (
    <div>
        All Posts 
        {users.map((u)=>(
            <div key ={u.id}>
                 <h2 className="text-xl font-semibold text-center">
            {u.firstName} {u.lastName}
          </h2>
            </div>
        ))}
    </div>
  )
}

export default User