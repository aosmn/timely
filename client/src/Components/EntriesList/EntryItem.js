import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Duration from '../DurationSelector';
import {padZero} from '../../Helpers/TimerHelpers'

export default function EntryItem({entry, handleDeleteEntry, handleEditEntry}) {
  const [title, setTitle] = useState(entry.title);
  const [startTime, setStartTime] = useState(entry.startTime);
  const [endTime, setEndTime] = useState(entry.endTime);
  const [, setSeconds] = useState(entry.seconds);
  const [, setMinutes] = useState(entry.minutes);
  const [, setHours] = useState(entry.hours);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDuration, setIsEditDuration] = useState(false);

  let titleInput = null;
  // let startTimeInput = null;
  // let endTimeInput = null;
  // const [whichEntry, setWhichEntry] = useState('');

  const deleteEntry = (e) => {  
    const result = window.confirm('Are you sure you want to delete this entry?');
    if (result) {
      handleDeleteEntry(e.target.dataset.id);
      
    }
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onClickTitle = (e) => {
    setIsEditTitle(true)
    // setWhichEntry(e.target.dataset.id)
  }

  const onBlurTitle = (e) => {
    setIsEditTitle(false);
    let update = { title: e.target.value };

    handleEditEntry(entry.id, update)
    titleInput = null;
    
  }

  useEffect(() => {   
    if (titleInput) {
      titleInput.focus();
    }
  }, [titleInput, isEditTitle]);

  const onKeyUp = (e) => {
    if (e.which === 13) {
      setIsEditTitle(false);
      let update = { title: e.target.value };
      handleEditEntry(entry.id, update)
      titleInput = null;
    }    
  }

  // const onChangeStartTime = (date) => {
  //   setStartTime(date)
  // }

  // const onChangeEndTime = (date) => {
  //   setEndTime(date)
  // }

  const onClickDuration = (e) => {
    setIsEditDuration(true);
  }
  const saveDuration = (value) => {
    setIsEditDuration(false);    
    handleEditEntry(entry.id, { seconds: value.seconds, minutes: value.minutes, hours: value.hours, startTime: value.startTime, endTime: value.endTime })
  }
  const changeDuration = (value) => {
    const {seconds, minutes, hours, startTime, endTime} = value;
    setSeconds(seconds);
    setMinutes(minutes);
    setHours(hours);
    setStartTime(startTime);
    setEndTime(endTime);
  }
  return (
    <li key={entry.id} className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
      <div className='d-flex'>
        {isEditTitle ? 
          <div className='form-group mb-0'>
            <input type='text' className='form-control' id='entryTitle' placeholder='No title' value={title} 
            onChange={onChangeTitle}
            onKeyUp={onKeyUp}
            onBlur={onBlurTitle}
            data-id={entry.id}
            ref={(input) => { titleInput = input; }} />
          </div>
        : 
          (
            <div onClick={onClickTitle}>
              {entry.title || 'No title'}
              <small className='ml-3'>{moment(startTime).format('ddd MMM D, hh:mm:ssa')} - {moment(endTime).format('ddd MMM D, hh:mm:ssa')}</small>
            </div>
          )
        }
      </div>
      <div className='d-flex flex-row align-items-center'>
        <div className='duration d-flex align-items-center'>
          {isEditDuration ? 
            <>
              <Duration entry={entry} onChange={changeDuration} saveDuration={saveDuration} onCancel={() => {setIsEditDuration(false)}}/>
            </>
          
          :
          <small className='text-secondary mr-3' onClick={onClickDuration}>
            {padZero(entry.hours)}:{padZero(entry.minutes)}:{padZero(entry.seconds)}.{padZero(entry.milliSeconds)}
          </small>
          }
        </div>
        <button className='btn btn-danger d-flex align-items-center' onClick={deleteEntry} data-id={entry.id}>
          <i className='material-icons-round' data-id={entry.id}>
            delete
          </i>
        </button>
      </div>
    </li>
  )
};