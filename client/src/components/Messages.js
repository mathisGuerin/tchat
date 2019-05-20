import React from 'react'
import '../styles/Messages.css'

const Messages = function({ messages }) {
  return (
    <div className="Users">
      {messages.map(message => (
        <div key={message._id}>{message.text}</div>
      ))}
    </div>
  )
}

export default Messages
