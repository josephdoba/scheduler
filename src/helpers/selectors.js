export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(eachDay => eachDay.name === day)
  const appointmentsForDay = selectedDay ? selectedDay.appointments.map(appID => state.appointments[appID]) : [];

  return appointmentsForDay
};

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(eachDay => eachDay.name === day)
  const interviewersForDay = selectedDay ? selectedDay.interviewers.map(intID => state.interviewers[intID]) : [];

  return interviewersForDay;
};

export function getInterview(state, interview) {  
  if(!interview.interview) return null;
  
  const interviewerID = interview.interview.interviewer;
  const interviewObj = {
    student: interview.interview.student,
    interviewer: state.interviewers[interviewerID].name
  }
  
  return interviewObj;
};