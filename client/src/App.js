import React, { Component } from 'react'
import Header from './components/Header'
import Users from './components/Users'
import Messages from './components/Messages'
import io from "socket.io-client";
import './styles/App.scss'

const socketUrl = "http://localhost:8080"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      messages: [],
      input: '',
      socket: null
    }
  }
  
  componentWillMount() {
    this.initSocket()
  }

  componentDidMount() {
    this.getUsers()
    this.getMessages()    
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log("Connected")
    })
    socket.on("new message", data => {
      console.log("Received new message : ", data)
      this.setState({ messages: data.messages })
    });
    this.setState({socket})
  }

  getUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
  }

  getMessages = () => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(messages => this.setState({ messages }))
      .then(this.fetchMessages)
  }

  postMessage = e => {
    e.preventDefault()
    fetch('/api/messages', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ text: this.state.input }),
    })
      .then(this.getMessages)
  }

  fetchMessages = () => {
    const socket = io(socketUrl);
    socket.emit("new message", this.state.messages);
    this.setState({input: ''})
  }

  handleChange = e => {
    this.setState({ input: e.target.value })
  }

  render() {
    const { users, messages } = this.state

    return (
      <div className="App">
        <Header />
        <div className="App-container">
          <Users users={users} />
          <Messages messages={messages} postMessage={postMessage} />
          <form className="Message-form" id="message" onSubmit={this.postMessage}>
            <textarea rows="2" onChange={this.handleChange} value={this.state.input}></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default App
