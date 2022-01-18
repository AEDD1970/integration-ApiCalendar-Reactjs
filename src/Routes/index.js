import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom"
//general
import Calendar from './Calendar';
import ErrorNotFound from './ErrorNotFound';




export default function RoutesApp() {
    return (
        <Routes>
            <Route exact path="/">
                <Calendar />
            </Route>
            <Route path="*">
                <ErrorNotFound />
            </Route>
        </Routes>
    )
}
