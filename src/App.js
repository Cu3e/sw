import React, {Component, Fragment} from 'react'
import 'bulma/css/bulma.min.css'
import Home from './Home'
import Post from './Post'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './index.css'

import { readAllData } from './utility'

class App extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    if ('indexedDB' in window) {
      console.log('@@ App - indexedDB')
      readAllData('idb-feed')
      .then(data => {
        if (!data || !data.length) return this.getData()
        return this.setState({data})
      }
    )
  } else {
      console.log('@@ App - Fetch')
      this.getData()
    }
  }

  getData = () => 
    fetch('https://www.reddit.com/r/earthporn.json')
      .then(res => res.json())
      .then(json => this.setState({ data: json.data.children }))


  render(){
    const { data } = this.state

    return (
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={p => <Home data={data} {...p}/>}/>
          <Route path="/:id" component={p => <Post data={data} {...p} />}/>
        </Fragment>
      </Router>
    )
  }
}

export default App
