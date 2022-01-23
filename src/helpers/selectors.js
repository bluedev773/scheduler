
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


  //passed: interview
 // { student: "Archie Cohen", interviewer: 2 }
//expected:
//   {  
//     "student": "Lydia Miller-Jones",
//     "interviewer": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     }
//   }