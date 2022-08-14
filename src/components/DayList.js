import React from 'react';
import DayListItem from './DayListItem';
import './DayListItem.scss';

export default function DayList(props) {
  console.log(props)
  const days = props.days
  const dayItems = days.map((day) => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={props.onChange}
        />
    )
  })

  return (
    <ul>
      {dayItems}
    </ul>
  );
};