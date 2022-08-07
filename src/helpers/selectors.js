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

/*
Carmens code to reference (with her permission):
export function getAppointmentsForDay(state, day) {
  let results = [];
  for (let i of state.days) {
    if (i.name === day) {
      i.appointments.forEach(appointment => results.push(state.appointments[appointment]))
    }
  };
  return results;
*/
