import React, { useState } from 'react'
import Dexie from 'dexie'
import '../styles/app.scss';

// import Form from './Form'
import Timer from './Timer';

const App = () => {
  return (
    <div className=''>
      <nav class="navbar navbar-light bg-primary">
        <a class="navbar-brand d-flex" href="#">
          <img src="timely-logo.svg" height="30" alt="" loading="lazy"/>
        </a>
      </nav>
      <div className='container'>
        <Timer db={new Dexie('TimelyDatabase')}/>
      </div>
    </div>
  )
}

export default App