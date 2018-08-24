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
      <div className="teasers-wrapper">
        {data && data.children
          ? data.children.map((el, i) => {
            const {title, thumbnail} = el.data
            return (
            <div className="teaser-wrapper" key={i}>
              <img className="image" src={thumbnail} alt="" />
              <h2>{title}</h2>
            </div>
            )}
          ) : <h3>Loading data...</h3>}
      </div>
    )
  }
}

export default App
