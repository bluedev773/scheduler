
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

    function bookInterview(id, interview) {

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
    
        const url = `/api/appointments/${id}`;
        return axios.put(url, appointment).then(() => {
          setState({...state, appointments});
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
    
        const url = `/api/appointments/${id}`;
        return axios.delete(url, appointment).then(() => {
          setState({...state, appointments});
        })
    }

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview
    }
    
}