
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

export function getInterview(state, interview) {
    if(interview === null) return null;
    const parsedInterview = interview;
    parsedInterview.interviewer = state.interviewers[interview.interviewer.toString()];
    return parsedInterview;
}

export function getInterviewersForDay(state, day) {

    if(state.days.length === 0) {
        return [];
    }
    const filteredByDay = state.days.filter(dayOfTheWeek => dayOfTheWeek.name === day);
    if(filteredByDay.length === 0) {
        return [];
    }
    const arrOfInterviewerIDs = filteredByDay[0].interviewers;
    const arrOfInterviewers = [];
    const interviewersAsArray = Object.values(state.interviewers);
    arrOfInterviewerIDs.forEach(interviewerID => {
        const filtered = interviewersAsArray.filter(interviewer => interviewer.id === interviewerID);
        arrOfInterviewers.push(filtered[0]);
    })

    return arrOfInterviewers;

  }
