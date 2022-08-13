import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay,
} from "../helpers/selectors";

import Appointment from "components/Appointment";
// import DayList from "components/DayList";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({ ...state, day });

  // ------------ Update Spots Remaining: ------------
  function updateSpots(state, appointments) {
    let spotsResult = 0;
    const appointmentsPerDayArray = state.days.map((day) => {
      if (state.day === day.name) {
        for (let aptId of day.appointments) {
          if (appointments[aptId].interview === null) {
            spotsResult++;
            day.spots = spotsResult;
            console.log(day.spots)
          }
        }
      }
      return day;
    });
    
    for(let aptId of appointmentsPerDayArray) {
      const nullCount = 0;
      if(appointmentsPerDayArray[aptId].interview === null){
        nullCount++
      }
      return nullCount;
    }
    if(nullCount === 5) {

    }
  }
  // function updateSpots(state, appointments) {
  //   let spotsResult = 0;
  //   return state.days.map((day) => {
  //     if (state.day === day.name) {
  //       for (let aptId of day.appointments) {
  //         if (appointments[aptId].interview === null) {
  //           spotsResult++;
  //           day.spots = spotsResult;
  //           console.log(day.spots)
  //         }
  //       }
  //     }
  //     return day;
  //   });
  // }

  // ------------  book interview:  ------------
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const cloneState = {
      ...state,
      appointments,
      days: updateSpots({ ...state }, appointments),
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState(cloneState);
      });
  }

  // ------------ Cancel Interview:  ------------
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const cloneState = {
      ...state,
      appointments,
      days: updateSpots({ ...state }, appointments),
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(cloneState);
      });
  }

  // ------------ retrieve API data ------------
  const apiDays = "http://localhost:8001/api/days";
  const apiAppointments = "http://localhost:8001/api/appointments";
  const apiInterviewers = "http://localhost:8001/api/interviewers";

  useEffect(() => {
    Promise.all([
      axios.get(apiDays),
      axios.get(apiAppointments),
      axios.get(apiInterviewers),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
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
    );
  });

  return { state, setDay, bookInterview, cancelInterview };
}
