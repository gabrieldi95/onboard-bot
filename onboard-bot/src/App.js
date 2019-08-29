import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    response: [],
    post: '',
    context: ''
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ response: this.state.response.concat([res.output.text[0]]), context: res.context})
      })
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
    const response = await fetch('/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: this.state.post , context: this.state.context})
    });
    const data = await response.json()
    this.setState({ response: this.state.response.concat([this.state.post, data.output.text[0]]), context: response.context });
  }

  render() {
    let messages = this.state.response.map((message) => {
      return <li>{message}</li>
    })
    return (
      <div>
        <div className="dialog">
          <ul>{messages}</ul>
        </div>
        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default App;
