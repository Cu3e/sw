import React, { Component } from 'react';

class App extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    fetch('https://www.reddit.com/r/earthporn.json')
      .then(res => res.json())
      .then(json => this.setState({ data: json.data }))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.data && this.state.data.children
          ? this.state.data.children.map(element => (
              <img className="image" src={element.data.thumbnail} />
            ))
          : null}
      </div>
    )
  }
}

export default App
