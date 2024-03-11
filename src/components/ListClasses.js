import SearchedClass from "./SearchedClass"
import Cookies from "js-cookie";
import EventEmitter from "./EventEmitter";
import {useEffect, useState} from 'react';
import { Typography } from "@mui/material";

export default function ListClasses() {
    const [courses, setCourses] = useState([]);
    function fetchCoursesFromCookies() {
        setCourses(Object.keys(Cookies.get()).map(key => {
            const courseData = Cookies.get(key);
            return JSON.parse(courseData);
    }))};

    useEffect(() => {
        //Gets initial Courses
        fetchCoursesFromCookies();
        const handleCourseUpdate = () => {
            fetchCoursesFromCookies();
        };
    
        //Handles and updates course display when adding/deleting a course
        EventEmitter.subscribe('courseUpdated', handleCourseUpdate);
    
        return () => {
            // Clean up subscription
            EventEmitter.events['courseUpdated'] = EventEmitter.events['courseUpdated'].filter(cb => cb !== handleCourseUpdate);
        };
    }, []);

    return (
        <>
            <Typography variant="h5" style={{ padding: '8px', textAlign: 'center', textDecoration: 'underline' }}>My Courses:</Typography>
            {
                courses.length > 0 && courses.map((course, index) => <SearchedClass key={index} data={course.data} />)                
            }
        </>
    );
}

//Bug: delete alert be careful lol