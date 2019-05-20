import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
      </div>
    );
  }
}

export default App;
