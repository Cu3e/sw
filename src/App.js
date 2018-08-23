import React, { Component } from 'react'
import './index.css'

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
    const { data } = this.state
    return (
      <div>
        {data && data.children
          ? data.children.map((el, i) => (
            <div className="teaser-wrapper" key={i}>
              <img className="image" src={el.data.thumbnail} alt="" />
              <h2>Example title</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius nisi turpis, luctus ultricies tellus interdum sit amet. Nam maximus malesuada rutrum. Nam at justo viverra, lobortis erat vel, posuere urna. Cras sit amet sem nec elit congue faucibus et at urna. Sed suscipit dolor at eros maximus, eget convallis sapien imperdiet. Aenean venenatis sodales enim ac pulvinar. Suspendisse ut lectus purus. Integer sed elementum ex. Pellentesque et egestas arcu.</p>
            </div>
            ))
          : null}
      </div>
    )
  }
}

export default App
