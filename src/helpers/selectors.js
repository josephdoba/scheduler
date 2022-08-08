export function getAppointmentsForDay(state, day) {
  const results = [];

  state.days.forEach((i) => {
    if (i.name === day) {
    i.appointments.forEach((dayAppointments) => {
      results.push(state.appointments[dayAppointments])
      })
    }
  });
  return results;
};


export function getInterview(state, interview) {
  console.log(state)
  console.log(interview)
  // console.log(!interview)
  // console.log(interview.interviewer) // dictates the ID of the interviewer
  
  if(!interview) return null;

  let result = {};

  for (const id in state.interviewers) {

    if (state.interviewers[id].id === interview.interviewer) {
    console.log(`the IDs from ${state.interviewers[id].id} and ${interview.interviewer} match`)

    return {
      student: interview.student,
      interviewer: state.interviewer
      }
    }
  };
};

/*
export function getInterview(state, interview) {
  if (interview === null) return null;

  for (let person in state.interviewers) {
    if (state.interviewers[person].id === interview.interviewer) {
      return {
        student: interview.student,
        interviewer: state.interviewers[person]
      }
    }
  };
};
*/
