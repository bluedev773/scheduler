
import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
      });

    useEffect(() => {
        console.log('API CALL')
        const daysURL = '/api/days';
        const appointmentsURL = '/api/appointments';
        const interviewersURL = '/api/interviewers';
        Promise.all([
        axios.get(daysURL),
        axios.get(appointmentsURL),
        axios.get(interviewersURL)
        ]).then((all) => {
            setState(prev => {
                return ({...prev, days: all[0].data , appointments: all[1].data, interviewers: all[2].data})
            });
        });
    },[])

    const setDay = day => { 
        console.log('day', day)
        console.log('Before', state)
        setState({ ...state, day });
        console.log('After', state)
      }
      //helper
      const getSpotsForDay = function(dayObj, appointments) {
        let spots = 0;
        for(const id of dayObj.appointments) {
          const appointment = appointments[id];
          if(!appointment.interview) {
            spots++;
          }
        }
        return spots;
      }  

      const updateSpots = function (state, appointments) {

        const dayObj = state.days.find(day => day.name === state.day);
      
        const spots = getSpotsForDay(dayObj, appointments);
        const day = {...dayObj, spots};
      
        const newDays = state.days.map(d=> d.name === state.day ? day : d);
      
        return newDays;
      };

    function bookInterview(id, interview) {

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(state, appointments);
    
        const url = `/api/appointments/${id}`;
        return axios.put(url, appointment).then(() => {
          setState({...state, appointments, days}); 
        })
      }

    function cancelInterview(id){

        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(state, appointments);
    
        const url = `/api/appointments/${id}`;
        return axios.delete(url, appointment).then(() => {
          setState({...state, appointments, days}); 
        })
    }

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview
    }
    
}