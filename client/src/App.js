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
      input: '',
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

  postMessage = e => {
    e.preventDefault()
    fetch('http://localhost:8080/messages', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ text: this.state.input }),
    })
      .then(res => res.json())
      .then(this.getMessages())
  }

  handleChange = e => {
    this.setState({ input: e.target.value })
  }

  render() {
    const { users, messages } = this.state

    return (
      <div className="App">
        <Header />
        <Users users={users} />
        <Messages messages={messages} postMessage={postMessage} />
        <form id="message" onSubmit={this.postMessage}>
          <input onChange={this.handleChange} value={this.state.input} type="text" />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default App
