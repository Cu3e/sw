import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class App extends Component {

  render() {
    if (!this.props.data) return null
    const { data } = this.props

    return (
      <div className="teasers-wrapper">
        {data ? data.map((el, i) => {
            const {title, thumbnail, id} = el.data

            return (
              <Link to={id} className="teaser-wrapper" key={i}>
                <img className="image" src={thumbnail} alt="" />
                <h2>{title}</h2>
              </Link>
            )}
          ) : <h3>Loading data...</h3>}
      </div>
    )
  }
}

export default App
