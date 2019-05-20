import React, { Component } from 'react'
import './styles/App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      messages: []
    }
  }

  componentDidMount() {
    this.getUsers()
    this.getMessages()
  }

  getUsers = () => {
    fetch('http://localhost:8080/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
  }


  getMessages = () => {
    fetch('http://localhost:8080/messages')
      .then(res => res.json())
      .then(messages => this.setState({ messages }))
  }

  render() {
    const { users, messages } = this.state

    return (
      <div className="App">
        {users.map(user => (
          <div key={user._id}>{user.username}</div>
        ))}
        {messages.map(message => (
          <div key={message._id}>{message.text}</div>
        ))}
      </div>
    )
  }
}

export default App
