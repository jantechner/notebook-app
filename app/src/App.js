import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import LoginForm from './LoginForm/LoginForm'
import Dashboard from './Dashboard/Dashboard'

import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="root-container">
          <Route exact path="/" component={LoginForm} />
          <Route path="/:user/notes" component={Dashboard} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
