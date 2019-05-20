import React, { Component } from 'react'
import Header from './components/Header'
import Users from './components/Users'
import Messages from './components/Messages'
import './styles/App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      messages: [],
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
        <Header />
        <Users users={users} />
        <Messages messages={messages} />
      </div>
    )
  }
}

export default App
