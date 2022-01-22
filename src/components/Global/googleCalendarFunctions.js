//export a function that gets start time(date picker), location, name 
const gapi = window.gapi
const CLIENT_ID = "393356175754-36er5mibtahfjqknk8r5ga6gbb5hmd51.apps.googleusercontent.com"
const API_KEY = "AIzaSyDhDXJ-lqZVED2yIAkA4x5ds7bqZ7lTXVk"
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar.events"

export const getListEvent = () => {
    return new Promise((res, rej) => {
        gapi.client.load('calendar', 'v3')

        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(response => {
            const events = response.result.items
            res(events.map(item => ({
                title: item.summary,
                startDate: item.start.dateTime,
                endDate: item.end.dateTime,
                id: item.id,
                completeEvent: item
            })))
        })
    })
}

export const addCalendarEvent = (startTime, endTime, title) => {
    return new Promise((res, rej) => {
        const timeZone = "America/Bogota";
        const isoStartDate = new Date(startTime.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split(".")[0];
        const isoEndDate = new Date(endTime.getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toISOString().split(".")[0];
        gapi.client.load('calendar', 'v3')

        //sign in with pop up window
        const event = {
            'summary': title, // or event name
            'start': {
                'dateTime': isoStartDate,
                'timeZone': timeZone
            },
            'end': {
                'dateTime': isoEndDate,
                'timeZone': timeZone
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'popup', 'minutes': 20 }
                ]
            }
        }

        const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
        })

        request.execute(event => {
            res(event)
            window.open(event.htmlLink)
        })
    })
}



export const updateEvent = (id, dataUpdate = {}) => {
    return new Promise((res, rej) => {
        const  request = gapi.client.calendar.events.patch({
            'calendarId': 'primary',
            'eventId': id,
            'resource': dataUpdate
        });
        
        request.execute(function (event) {
            console.log(event);
            res(event)
        });
    })
}

export const deleteEvent = (id) => {
    return new Promise((res, rej) => {
        const  request = gapi.client.calendar.events.delete({
            calendarId: 'primary',
            eventId: id,
        });
        
        request.execute(function (event) {
            res(event)
        });
    })
}