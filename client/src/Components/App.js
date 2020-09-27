import React, { Component } from 'react'
import Dexie from 'dexie'
import '../styles/app.scss';

// import Form from './Form'
import Timer from './Timer';
import Joyride from 'react-joyride';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          target: '.step-0',
          content: 'Timely is a time logging app. Let\'s get productive!',
        },
        {
          target: '.step-1',
          content: 'Enter the title of the task you\'re currently working on',
        },
        {
          target: '.step-2',
          content: 'Start the timer',
        },
        {
          target: '.step-3',
          content: 'Stop the timer',
        },
        {
          target: '.step-4',
          content: 'Timer duration is shown here',
        },
        {
          target: '.step-5',
          content: 'Your time entries will be shown here',
        },
      ]
    };
  }
  
  render() {
    const { steps } = this.state;
    return (
      <div className=''>
        <Joyride
          steps={steps}
          continuous={true}
          // spotlightClicks={true}
        />
        <nav class="navbar navbar-light bg-primary">
          <div className='container'>
            <a class="navbar-brand d-flex step-0" href="#">
              <img src="timely-logo.svg" height="30" alt="" loading="lazy"/>
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