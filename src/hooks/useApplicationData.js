import React from 'react';

export default function useApplicationData() {
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



}