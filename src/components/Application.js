import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import axios from 'axios';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // book interview:
  const bookInterview = (id, interview) => {
    console.log(id, interview);

  }
  
  // retrieve API data
  const apiDays = "http://localhost:8001/api/days";
  const apiAppointments = "http://localhost:8001/api/appointments"
  const apiInterviewers = "http://localhost:8001/api/interviewers"

  // Set Day consts
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({...state, day });

    useEffect(() => {
      Promise.all([
        axios.get(apiDays),
        axios.get(apiAppointments),
        axios.get(apiInterviewers)
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      }).catch((err) => {
        console.log(err);
      });
    }, []);

 // declare schedules variable:
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment);
    
    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id} 
      time={appointment.time} 
      interview={interview}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview(1, 5)}
      />
    )
  })

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
            <DayList 
              day={state.day}
              days={state.days}
              value={state.day} 
              onChange={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
