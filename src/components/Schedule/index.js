import React, { useState } from 'react'
import { Paper } from '@material-ui/core'
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    DateNavigator,
    TodayButton,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';


function Schedule({ data, addingNewAppointment, updateAppointment, deleteAppointment }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const onCurrentDateChange = (currentDate) => setCurrentDate(currentDate)
    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            addingNewAppointment(added)
        }
        if(changed){
            updateAppointment(changed)
        }
        if(deleted){
            deleteAppointment(deleted)
        }
    }
    const startDayHour = 0
    const endDayHour = 24
    return (
        <Paper>
            <Scheduler data={data} height={660}>
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={onCurrentDateChange}
                />
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <IntegratedEditing />
                <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
                <DayView
                    startDayHour={startDayHour}
                    endDayHour={endDayHour}
                />
                <MonthView />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
                <ConfirmationDialog />
                <Appointments />
                <AppointmentTooltip
                    showOpenButton
                    showDeleteButton
                />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    )
}

export default Schedule
