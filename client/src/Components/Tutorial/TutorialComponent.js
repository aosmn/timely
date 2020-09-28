import React, { Component } from 'react'
import Joyride, { STATUS } from 'react-joyride';

export default class TutorialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // runTutorial: false,
      stepIndex: 0,
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
  componentDidMount() {
    console.log('here');
    this.setState({runTutorial: true})
  }

  handleJoyrideCallback = data => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      window.localStorage.setItem('timelyTutorialDone', true)
    }
  };
  render() {
    const { steps } = this.state;
    return window.localStorage.getItem('timelyTutorialDone') ? null :
    <Joyride
      steps={steps}
      continuous={true}
      callback={this.handleJoyrideCallback}
      disableOverlayClose={true}
      showProgress={true}
      showSkipButton={true}
      // scrollToFirstStep={true}
      // run={runTutorial}
      // stepIndex={stepIndex}
      // spotlightClicks={true}
    />
  }
}
