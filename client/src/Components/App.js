import React, { useState } from 'react'
import Dexie from 'dexie'

// import Form from './Form'
import Timer from './Timer';

const App = () => {
  return (
    <div className='app'>
      <Timer db={new Dexie('TimelyDatabase')}/>
      {/* <button onClick={() => setOpen(!open)}>{`${
        open ? 'Close' : 'Open'
      } Form`}</button> */}
      {/* Pass in a new connection to the database when Form is first rendered */}
      {/* {open && <Form db={new Dexie('FormDatabase')} />} */}
    </div>
  )
}

export default App