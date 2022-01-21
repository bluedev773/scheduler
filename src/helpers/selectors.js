
export function getAppointmentsForDay(state, day) {

    if(state.days.length === 0) {
        return [];
    }
    const filteredByDay = state.days.filter(dayOfTheWeek => dayOfTheWeek.name === day);
    if(filteredByDay.length === 0) {
        return [];
    }
    const arrOfAppointmentIDs = filteredByDay[0].appointments;
    const arrOfAppointments = [];
    const appointmentsAsArray = Object.values(state.appointments);
    arrOfAppointmentIDs.forEach(appointmentID => {
        const filtered = appointmentsAsArray.filter(appointment => appointment.id === appointmentID);
        arrOfAppointments.push(filtered[0]);
    })

    return arrOfAppointments;

  }