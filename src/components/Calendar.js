import * as React from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

export default class DemoApp extends React.Component {
    render() {
      return (
        <FullCalendar
          plugins={[ timeGridPlugin ]}
          initialView="timeGridWeek"
        />
      )
    }
  }

  /* npm i --save
    @fullcalendar/react
    @fullcalendar/daygrid
    @fullcalendar/timegrid
    @fullcalendar/interaction
    @fullcanedar/core
  */