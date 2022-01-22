import React, { useState, useEffect } from 'react'
import { addCalendarEvent, deleteEvent, getListEvent, updateEvent } from '../../components/Global/googleCalendarFunctions'
import Schedule from '../../components/Schedule'

export default function Calendar() {
    const [dataCalendar, setDataCalendar] = useState([])
    const gapi = window.gapi
    const CLIENT_ID = "393356175754-36er5mibtahfjqknk8r5ga6gbb5hmd51.apps.googleusercontent.com"
    const API_KEY = "AIzaSyDhDXJ-lqZVED2yIAkA4x5ds7bqZ7lTXVk"
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar.events"
    useEffect(() => {
      
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(() => {
                gapi.client.load('calendar', 'v3')
                const auth = sessionStorage.getItem('auth');
            console.log('auth >>> ', auth)
            if(auth !== "true") {
                gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    sessionStorage.setItem('auth', 'true');  
                    handleListEvent()
                })
            }else{
                handleListEvent()
            }
            })
            //sign in with pop up window
            
        })
    }, [])

    const addingNewAppointment = async (newAppointment) => {
        const { startDate, endDate, title } = newAppointment
        const event = await addCalendarEvent(startDate, endDate, title)
        setDataCalendar(prevState => [...prevState, {
            title: event.summary,
            startDate: event.start.dateTime,
            endDate: event.end.dateTime,
            id: event.id,
            completeEvent: event
        }])
    }
    const updateAppointment = async (newAppointment) => {
        const data = dataCalendar.filter(item => newAppointment[item.id])[0]
        const getFieldToUpdate = Object.keys(newAppointment[data.id])
        const newEvent = data.completeEvent
        if (getFieldToUpdate.includes("title")) newEvent.summary = newAppointment[data.id].title
        if (getFieldToUpdate.includes("startDate")) {
            let isoStartDate = new Date(newAppointment[data.id].startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split(".")[0];
            newEvent.start.dateTime = isoStartDate
        }
        if (getFieldToUpdate.includes("endDate")) {
            let isoEndDate = new Date(newAppointment[data.id].endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split(".")[0];
            newEvent.end.dateTime = isoEndDate
        }
        await updateEvent(data.id, newEvent)
        // handleListEvent() 
    }

    const deleteAppointment = async (id) => {
        await deleteEvent(id)
        // handleListEvent()
    }

    const handleListEvent = async () => {
        const list = await getListEvent();
        setDataCalendar(list)
    }
    console.log('dataCalendar >>> ', dataCalendar)
    return (
        <div >
            <h1>Agenda Bewe</h1>
            <Schedule
                data={dataCalendar}
                addingNewAppointment={addingNewAppointment}
                updateAppointment={updateAppointment}
                deleteAppointment={deleteAppointment}
            />
        </div>
    )
}
