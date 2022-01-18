import React, { useState, useEffect } from 'react'
import { addCalendarEvent, deleteEvent, getListEvent, updateEvent } from '../../components/Global/googleCalendarFunctions'
import Schedule from '../../components/Schedule'

export default function Calendar() {
    const [dataCalendar, setDataCalendar] = useState([])

    useEffect(() => {
        handleListEvent()
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
        if(getFieldToUpdate.includes("title")) newEvent.summary = newAppointment[data.id].title
        if(getFieldToUpdate.includes("startDate")) {
            let isoStartDate = new Date(newAppointment[data.id].startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split(".")[0];
            newEvent.start.dateTime = isoStartDate
        }
        if(getFieldToUpdate.includes("endDate")) {
            let isoEndDate = new Date(newAppointment[data.id].endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split(".")[0];
            newEvent.end.dateTime = isoEndDate
        }
        await updateEvent(data.id, newEvent)
        handleListEvent() 
    }

    const deleteAppointment = async (id) => {
        await deleteEvent(id)
        handleListEvent()
    }

    const handleListEvent = async () => {
        const list = await getListEvent();
        setDataCalendar(list)
    }
    
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
