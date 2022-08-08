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
  
  const apiDays = "http://localhost:8001/api/days";
  const apiAppointments = "http://localhost:8001/api/appointments"
  const apiInterviewers = "http://localhost:8001/api/interviewers"

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({...state, day });
  /*const setDays = (days) => {setState(prev => ({ ...prev, days }));}*/

  const schedule = dailyAppointments.map((appointment) => {
    // console.log("--------- from schedule: dailyAppointments.map: --------- ")
    // console.log(state)
    // console.log("--------- from schedule: appointment --------- ")
    // console.log(appointment)
    const interview = getInterview(state, appointment);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id} 
        time={appointment.time} 
        interview={interview}
        />
    )
  })

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
