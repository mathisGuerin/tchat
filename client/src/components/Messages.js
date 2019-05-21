import React from 'react'
import '../styles/Messages.css'

const Messages = function({ messages, postMessage }) {
  return (
    <div className="Messages">
      {messages.length > 0 && messages.map(message => (
        <div className="Message" key={message._id}>
          <div className="Message-user">{message.user}</div>
          <div className="Message-text">{message.text}</div>
        </div>
      ))}
      
    </div>
  )
}

export default Messages
