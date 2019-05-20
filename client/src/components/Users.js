import React from 'react'
import '../styles/Users.css'

const Users = function({ users }) {
  return (
    <div className="Users">
      {users.map(user => (
        <div className="User" key={user._id}>{user.username}</div>
      ))}
    </div>
  )
}

export default Users
