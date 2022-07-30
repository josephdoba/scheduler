import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {

const { id, name, spots, value, setDay } = props

  const days = props.days
  const dayItems = days.map((day) => {
    return (
      <DayListItem 
        key={id}
        name={name} 
        spots={spots} 
        selected={name === props.value}
        setDay={props.onChange}
        />
    )
  })

  return (
    <ul>
      {dayItems}
    </ul>
  );
}

/*
export default function DayList(props){

  return(
    <ul>
      <DayListItem 
        key={props.days[0].id}
        name={props.days[0].name} 
        spots={props.days[0].spots} 
        selected={props.days[0].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem
        key={props.days[1].id} 
        name={props.days[1].name} 
        spots={props.days[1].spots} 
        selected={props.days[1].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem 
        key={props.days[2].id}
        name={props.days[2].name}
        spots={props.days[2].spots} 
        selected={props.days[2].name === props.day}
        setDay={props.setDay}  
      />      
    </ul>
  )
}
*/