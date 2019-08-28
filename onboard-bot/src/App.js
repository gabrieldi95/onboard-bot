import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    response: '',
    post: '',
    responseToPost: ''
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err))
  }

  async callApi() {
    const response = await fetch('/message');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state)
    const response = await fetch('message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: this.state.post })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  }

  render() {
    return (
      <div>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    )
  }

}

export default App;
