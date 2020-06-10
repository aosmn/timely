import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import EntriesList from './EntriesList';

import '../styles/timer.scss';
export default function Timer({ db }) {
  const [milliSeconds, setMilliSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  function toggle() {
    if (!isActive) {
      setStartTime(new Date());
    }
    setIsActive(!isActive);
  }

  function stop() {
    // setIsActive(false);
    save()
  }

  function reset(fromStop) {
    if (fromStop === true) {
      setSeconds(0);
      setMilliSeconds(0);
      setMinutes(0);
      setHours(0);
      setIsActive(false);
      setIsStarted(false);
      setTitle('');
    } else {
      const confirmReset = window.confirm('Are you sure you want to reset timer?')
      if (confirmReset) {
        setSeconds(0);
        setMilliSeconds(0);
        setMinutes(0);
        setHours(0);
        setIsActive(false);
        setIsStarted(false);
        setTitle('');
      }
    }
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      if(!isStarted) {
        setIsStarted(true)
      }
      interval = setInterval(() => {
        // if (milliSeconds >= 9) {
        //   setMilliSeconds(0);
        //   setSeconds(seconds + 1)
          if (seconds === 59) {
            setSeconds(0);
            if (minutes === 59) {
              setMinutes(0);
              setHours(hours + 1);
            } else {
              setMinutes(minutes + 1);
            }
          } else {
            setSeconds(seconds + 1)
          }
        // } else {
        //   setMilliSeconds(milliSeconds + 1)
        // }
        
      }, 1000);
    } else if(!isActive && milliSeconds !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    }
  }, [isActive, isStarted, milliSeconds, seconds, hours, minutes]);

  useEffect(
    () => {
      // create the store
      db.version(1).stores({ 
        timeEntries: 'id, createdAt, updatedAt, title, milliSeconds, seconds, minutes, hours, startTime, endTime'
      });      

      db.timeEntries
      .toCollection()
      .sortBy('createdAt')
      .then((entries) => {
        // console.log(entries);
        
        setEntries(entries);
        // this.setState({ entries });
      });


      // close the database connection if form is unmounted or the
      // database connection changes
      return () => db.close()
    },
    // run effect whenever the database connection changes
    [db]
  )
  // sets the name in the store and in the state hook
  const setItem = id => value => {
    const entry = {
      id,
      ...value,
      createdAt: new Date()
    }
    // update the store
    db.timeEntries.put(entry).then((id) => {
      const newList = [...entries, entry ];
      setEntries(newList)
    });
    reset(true);
    // update the state hook
    // setNames(prevNames => ({ ...prevNames, [id]: value }))
  }

  const padZero = (n) => {
    return String('00' + n).slice(-2);
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const save = (e) => {
    setItem(uuidv4())({
      title,
      milliSeconds,
      seconds,
      minutes,
      hours,
      startTime,
      endTime: new Date()
    });
    
  }

  const handleDeleteEntry = (id) => {
    db.table('timeEntries')
      .delete(id)
      .then(() => {
        const newList = entries.filter((entry) => entry.id !== id);
        setEntries(newList);
      });
  }

  const handleEditEntry = (id, update) => {
    db.table('timeEntries')
      .update(id, {...update, updatedAt: new Date()})
      .then(() => {
        const entryToUpdate = entries.find((entry) => entry.id === id);
        const newList = [
          ...entries.filter((entry) => entry.id !== id),
          Object.assign({}, entryToUpdate, update)
        ];
        setEntries(newList);
        // console.log(newList);
        
      });
  }

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   // setItem('firstname')(names.firstname)
  //   // setItem('lastname')(names.lastname)

  // }

  return (
    <div className='current-entry row d-flex align-items-center'>
      <div className='col pl-0'>
        <input 
          type='text'
          className='form-control'
          id='title'
          placeholder='What are you working on?'
          value={title}
          onChange={onChangeTitle}/>
      </div>
      <div className='timer col'>
        <div className='time'>
          {padZero(hours)}:{padZero(minutes)}:{padZero(seconds)}
          {/* .{padZero(milliSeconds)} */}
        </div>
      </div>

        <div className='col-12 row mb-5'>
          <button className='btn btn-link text-light ml-auto mr-3' onClick={reset}>
            Reset
          </button>
          <button className='btn btn-primary mr-3 d-flex align-items-center' onClick={toggle}>
            {isActive ? 
            <i className='material-icons-round'>
              pause
            </i>
            : 
            <i className='material-icons-round'>
              play_arrow
            </i>}
          </button>
          {
            isActive || !isStarted ? 
            <button disabled={!isStarted} className='btn btn-danger mr-3 d-flex align-items-center' onClick={stop}>
              <i className='material-icons-round'>
                stop
              </i>
            </button>
            :
            <button className='btn btn-success py-0 mr-3 d-flex' onClick={save}>
              <i className='material-icons-round'>
                save
              </i>
            </button>
          }
        </div>
        {db ? 
        <EntriesList entries={entries} handleDeleteEntry={handleDeleteEntry} handleEditEntry={handleEditEntry}/>
        : null}
    </div>
  );
}
