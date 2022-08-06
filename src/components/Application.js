import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import axios from 'axios';

//Mock Data:
/*
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
*/
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

const convertAppointmentToArray = Object.values(appointments);

const appointmentItems = convertAppointmentToArray.map((appointment) => {
  return (
    <Appointment 
      key={appointment.id}
      id={appointment.id} 
      time={appointment.time} 
      interview={appointment.interview}
      />
  )
})

/*
const appointmentItems = appointments.map((appointment) => {
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id} 
        time={appointment.time} 
        interview={appointment.interview}
        />
    )
  })
*/

export default function Application(props) {
  const [days, setDays] = useState([]); // Defines the default day that is selected, and to be passed through to other components.

  const [day, setDay] = useState(null);

  useEffect(() => {
    const testDays = "http://localhost:8001/api/days";
    axios.get(testDays).then(response => {
      console.log(response)
      setDays([...response.data])
    })
  }, [])
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList days={days} value={day} onChange={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointmentItems}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
