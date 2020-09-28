import React from 'react';
import EntryItem from './EntryItem'

export default function EntriesList({ entries, handleDeleteEntry, handleEditEntry }) {
  const padZero = (n) => {
    return String('00' + n).slice(-2);
  }

  if (entries && entries.length > 0) {
    
    const entriesList = entries.map(entry => {    
      return <EntryItem key={entry.id} padZero={padZero} entry={entry} handleDeleteEntry={handleDeleteEntry} handleEditEntry={handleEditEntry}/>
    })

    return (
      <ul className='list-group col-12 pr-0 step-5 '>
        {entriesList}
      </ul>
    )
  }
  return <div className='col-12 px-0 step-5'>
    <div className="alert alert-secondary text-center text-secondary" role="alert">
      No logs yet. Start logging your time now!
    </div>
  </div>
}
