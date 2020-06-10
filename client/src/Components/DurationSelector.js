import React, { Component } from 'react';
import '../styles/popup.scss';
import Popup from 'reactjs-popup';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

class DurationSelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      startTime: props.entry.startTime || new Date(),
      endTime: props.entry.endTime || new Date(),
      regexp : /^[0-9\:\b]+$/,
      seconds: props.entry.seconds,
      minutes: props.entry.minutes,
      hours: props.entry.hours,
      duration: `${this.padZero(props.entry.hours)}:${this.padZero(props.entry.minutes)}:${this.padZero(props.entry.seconds)}`
    }
  }

  onChangeText = (e) => {

    const value = e.target.value;
    const values = value.split(':')
    const id = e.target.id;
    const seconds = parseInt(values.pop(), 10) || 0;
    const minutes = parseInt(values.pop(), 10) || 0;
    const hours = parseInt(values.pop(), 10) || 0;
    let duration = hours*60*60 + minutes*60 + seconds;
    
    console.log(hours, minutes, seconds);

    duration = this.splitDuration(duration);
    // if ((id === 'seconds' || id === 'minutes') && parseInt(value) > 59) {
    //   value = 59
    // }
    if (value === '' || this.state.regexp.test(value)) {
      this.setState({ 
        duration: value,
        hours: duration.hours,
        minutes: duration.minutes,
        seconds: duration.seconds,
        endTime: moment(this.state.startTime).add(duration, 'seconds')._d
      }, () => {
        this.props.onChange({
          seconds: this.state.seconds,
          minutes: this.state.minutes,
          hours: this.state.hours,
          startTime: this.state.startTime,
          endTime: this.state.startTime
        })

      })
    }
    // this.setState(value)
  }

  onBlur = e => {
    const value = e.target.value;
    const values = value.split(':')
    const id = e.target.id;
    const seconds = parseInt(values.pop(), 10) || 0;
    const minutes = parseInt(values.pop(), 10) || 0;
    const hours = parseInt(values.pop(), 10) || 0;
    let duration = hours*60*60 + minutes*60 + seconds;
    
    console.log(hours, minutes, seconds);

    duration = this.splitDuration(duration);
    // if ((id === 'seconds' || id === 'minutes') && parseInt(value) > 59) {
    //   value = 59
    // }
    if (value === '' || this.state.regexp.test(value)) {
      this.setState({ 
        duration: `${this.padZero(duration.hours)}:${this.padZero(duration.minutes)}:${this.padZero(duration.seconds)}`,
      });
    }
  }

  splitDuration = (durationInSeconds) => {
    const seconds = durationInSeconds%60;
    const durationInMinutes = (durationInSeconds-seconds)/60;
    const minutes = durationInMinutes%60;
    const hours = (durationInMinutes-minutes)/60;

    return {seconds, minutes, hours};
  }
  
  getDuration = (startTime, endTime) => {    
    const duration = moment(endTime).diff(moment(startTime), 'seconds');
    
    // const seconds = duration%60;
    // const durationInMinutes = (duration-seconds)/60;
    // const minutes = durationInMinutes%60;
    // const hours = (durationInMinutes-minutes)/60;
    const {hours, minutes, seconds} = this.splitDuration(duration);
    this.setState({
      seconds,
      minutes,
      hours,
      duration: `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`

    }, () => {
        this.props.onChange({
          seconds: this.state.seconds,
          minutes: this.state.minutes,
          hours: this.state.hours,
          startTime: this.state.startTime,
          endTime: this.state.endTime
        })

      })

    // let hours = Math.floor(duration / (60*60));
    // let minutes = duration - 

  }

  onChangeStartTime = (date) => {
    this.setState({startTime: date})
    this.getDuration(date, this.state.endTime)
  }

  onChangeEndTime = (date) => {
    this.setState({endTime: date})
    this.getDuration(this.state.startTime, date)
  }

  saveDuration = () => {
    this.props.saveDuration({
      seconds: this.state.seconds,
      minutes: this.state.minutes,
      hours: this.state.hours,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    });
  }
  
  padZero = (n) => {
    return String('00' + n).slice(-2);
  }
  render() {
    const {trigger, entry, onCancel, onClick} = this.props;

    return (
          <div className='duration-picker-container d-flex align-items-center'>
            <div className='form-group d-flex flex-row align-items-center mb-0'>
            <Popup
              trigger = {
                <input
                  type='text'
                  className='form-control time-input-part'
                  id='duration'
                  value={this.state.duration}
                  onChange={this.onChangeText}
                  onBlur={this.onBlur}
                  />

              }
              position='bottom center'
              on='focus'
              >
              {close => (
                <div className='d-flex'>
                  <div className='d-flex flex-column'>
                    <label className='text-secondary text-left'><small>From</small></label>
                    <DateTimePicker
                      onChange={this.onChangeStartTime}
                      value={this.state.startTime}
                      disableClock={true}
                      calendarIcon={null}
                      clearIcon={null}
                      maxDetail='second'
                      maxDate={moment(this.state.endTime).subtract({seconds: 1})._d}
                      className='mr-3'
                    />
                  </div>
                  <div className='d-flex flex-column'>
                    <label className='text-secondary text-left'><small>To</small></label>
                  
                  <DateTimePicker
                    onChange={this.onChangeEndTime}
                    value={this.state.endTime}
                    disableClock={true}
                    calendarIcon={null}
                    clearIcon={null}
                    maxDetail='second'
                    minDate={moment(this.state.startTime).add({seconds: 1})._d}
                  />
                </div>
                </div>
              )}
            </Popup>
            </div>
            <button className='btn btn-secondary d-flex px-2 ml-2' onClick={this.saveDuration}>
              <i className='material-icons-round'>
                save
              </i>
            </button>
            <button className='btn btn-link text-dark d-flex p-0' onClick={onCancel}>
              <i className='material-icons-round'>
                close
              </i>
            </button>
          </div>
      
    );
  }
}

export default DurationSelector;