import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/redditSW.js').then(
    function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    },
    function(err) {
      console.log('ServiceWorker registration failed: ', err)
    }
  )
}

// const url = 'https://service-worker-wp.firebaseio.com/posts.json'

// const defferedPrompt;
// window.addEventListener('beforeinstallprompt', function(event){
//   console.log('beforeinstallprompt fired')
//   event.preventDefault()
//   defferedPrompt = event;
//   return false
// })

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
