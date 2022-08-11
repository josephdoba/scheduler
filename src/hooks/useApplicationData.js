import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from '../helpers/selectors';

import Appointment from 'components/Appointment';
import DayList from "components/DayList";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // Set Day consts
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({...state, day });

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
  };

  // ------------ Update Spots Remaining: ------------

  function updateSpots(id) {
    
  };

  // ------------ retrieve API data ------------
  const apiDays = "http://localhost:8001/api/days";
  const apiAppointments = "http://localhost:8001/api/appointments"
  const apiInterviewers = "http://localhost:8001/api/interviewers"

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


 // ------------ Map all daily appointments to schedule: ------------
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

return { state, setDay, bookInterview, cancelInterview }

}