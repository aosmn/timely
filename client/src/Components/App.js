import React, { Component } from 'react'
import Dexie from 'dexie'
import '../styles/app.scss';

import TutorialComponent from './Tutorial/TutorialComponent'
// import Form from './Form'
import Timer from './Timer';

class App extends Component {
  render() {
    return (
      <div className=''>
        <TutorialComponent />
        <nav className="navbar navbar-light bg-primary">
          <div className='container'>
            <a className="navbar-brand d-flex step-0" href="/">
              <img src={`${process.env.PUBLIC_URL}/timely-logo.svg`} height="30" alt="" loading="lazy"/>
            </a>
          </div>
        </nav>
        <div className='container'>
          <Timer db={new Dexie('TimelyDatabase')}/>
        </div>
      </div>
    )
  }
}

export default App