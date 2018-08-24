import React from 'react';
import ReactDOM from 'react-dom';
import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import App from './App';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
}



// const defferedPrompt;
// window.addEventListener('beforeinstallprompt', function(event){
  //   console.log('beforeinstallprompt fired')
  //   event.preventDefault()
  //   defferedPrompt = event;
  //   return false
  // })
  
  ReactDOM.render(<App />, document.getElementById('root'));
  unregisterServiceWorker();
