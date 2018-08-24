import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import Post from './Post'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
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

  render(){
    const { data } = this.state

    return (
      <Router>
        <Router>
          <Fragment>
            <ul><li><Link to="/">Home</Link></li></ul>
            <Route exact path="/" component={p => <Home data={data} {...p}/>}/>
            <Route path="/:id" component={p => <Post data={data} {...p} />}/>
          </Fragment>
        </Router>
      </Router>
    )
  }
}

export default App


