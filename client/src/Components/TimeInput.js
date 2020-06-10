import React, { Component } from 'react';

import '../styles/durationInput.scss';

class TimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: props.entry.startTime || new Date(),
      endTime: props.entry.endTime || new Date(),
      regexp : /^[0-9\b]+$/,
      seconds: props.entry.seconds,
      minutes: props.entry.minutes,
      hours: props.entry.hours
    }
  }

  onChangeText = (e) => {
    // console.log(e.target.id);

    let value = e.target.value;
    const id = e.target.id;
    if ((id === 'seconds' || id === 'minutes') && parseInt(value) > 59) {
      value = 59
    }
    if (value === '' || this.state.regexp.test(value)) {
      this.setState({ [id]: value }, () => {
        this.props.onChange({
          seconds: this.state.seconds,
          minutes: this.state.minutes,
          hours: this.state.hours
        })

      })
    }
    // this.setState(value)
  }
  onBlur = e => {
    let value = e.target.value;
    const id = e.target.id;
    if(value === '') {
      value = 0;
      this.setState({ [id]: value }, () => {
        this.props.onChange({
          seconds: this.state.seconds,
          minutes: this.state.minutes,
          hours: this.state.hours
        })
      })
    }
  }
  render() {
    return (
      <div className='duration-picker-container d-flex align-items-center'>
        <div className='form-group d-flex flex-row align-items-center mb-0'>
          <input type='text' className='form-control time-input-part' id='hours' maxLength='2' pattern='[\d]{9}' value={this.state.hours} onChange={this.onChangeText} onBlur={this.onBlur} />
          :
          <input type='text' className='form-control time-input-part' id='minutes' maxLength='2' pattern='[\d]{9}' value={this.state.minutes} onChange={this.onChangeText} onBlur={this.onBlur} />
          :
          <input type='text' className='form-control time-input-part' id='seconds' maxLength='2' pattern='[\d]{9}' value={this.state.seconds} onChange={this.onChangeText} onBlur={this.onBlur} />
        </div>
        <button className='btn btn-secondary d-flex px-2 ml-2' onClick={this.props.saveDuration}>
          <i className='material-icons-round'>
            save
          </i>
        </button>
        <button className='btn btn-link text-dark d-flex p-0' onClick={this.props.onCancel}>
          <i className='material-icons-round'>
            close
          </i>
        </button>
      </div>
    );
  }
}

export default TimeInput;