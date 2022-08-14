import React, { useState, useEffect } from "react";
import axios from 'axios';
import Appointment from "./Appointment";
import DayList from "./DayList";
import "components/Application.scss";
import "components/DayListItem.scss";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// New code for addressing separation of concerns:
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

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
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
};


// old code:
/* Moved to useApplicationData.js
// ------------ Main application component and set state 
export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // ------------  book interview:  ------------ 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // put request to api database when save is clicked
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })
  };

  // ------------ Cancel Interview:  ------------ 
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })

  }

  // ------------ retrieve API data ------------
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


 // ------------ map all schedules: ------------
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id} 
      time={appointment.time} 
      interview={interview}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
*/