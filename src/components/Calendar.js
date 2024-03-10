import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Cookies from 'js-cookie';
import EventEmitter from './EventEmitter';


const weekDays = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };

const doesOverlap = (event1, event2) => {
  // Assuming startTime and endTime are in 'HH:MM' format
  const start1 = event1.startTime.split(':').map(Number);
  const end1 = event1.endTime.split(':').map(Number);
  const start2 = event2.startTime.split(':').map(Number);
  const end2 = event2.endTime.split(':').map(Number);

  const date1Start = new Date(0, 0, 0, start1[0], start1[1]);
  const date1End = new Date(0, 0, 0, end1[0], end1[1]);
  const date2Start = new Date(0, 0, 0, start2[0], start2[1]);
  const date2End = new Date(0, 0, 0, end2[0], end2[1]);

  return date1Start < date2End && date2Start < date1End;
};

export default function Calendar() {
  const [uniqueEvents, setUniqueEvents] = useState([]);
  const fetchCoursesFromCookies = () => {
    const courses = Object.keys(Cookies.get()).map(key => {
      const courseData = Cookies.get(key);
      return JSON.parse(courseData);
    });

    // Process courses data to create events for FullCalendar
    let tempEvents = courses.map(course => {
      if (!course || !course.data) return null;

      const { startTime, endTime, days } = course.data;
      const daysOfWeek = days.split(',').map(day => weekDays[day.trim()]);
      return { title: course.data.courseName, daysOfWeek, startTime, endTime };
    }).filter(event => event !== null);

    // Filter out events that overlap in time on the same day
    let filteredEvents = [];
    tempEvents.forEach(event => {
      let isOverlapping = filteredEvents.some(existingEvent => 
        existingEvent.daysOfWeek.some(day => event.daysOfWeek.includes(day)) &&
        doesOverlap(existingEvent, event)
      );
      if (!isOverlapping) {
        filteredEvents.push(event);
      }
    });

    setUniqueEvents(filteredEvents);
  };
  useEffect(() => {
    fetchCoursesFromCookies(); // This will run once on component mount

    const handleCourseUpdate = () => {
        fetchCoursesFromCookies();
    };

    EventEmitter.subscribe('courseUpdated', handleCourseUpdate);

    return () => {
        // Clean up subscription
        EventEmitter.events['courseUpdated'] = EventEmitter.events['courseUpdated'].filter(cb => cb !== handleCourseUpdate);
    };
}, []);

return (
    <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        events={uniqueEvents}
        allDaySlot={false}
    />
);
};


