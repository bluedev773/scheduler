import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });



  const setDay = day => setState({ ...state, day });



  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = '/api/appointments'
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL)
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data , appointments: all[1].data}));
    });
  },[])

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const parsedAppointments = dailyAppointments.map((appointment) => <Appointment key={appointment.id} {...appointment} />)
  parsedAppointments.push(<Appointment key="last" time="5pm" />)
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
        {parsedAppointments}
      </section>
    </main>
  );
}
