import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ClassModal({ course, handleOnClose, isModalOpen }) {
  const [convertedStart, setConvertedStart] = React.useState("");
  const [convertedEnd, setConvertedEnd] = React.useState("");

  useEffect(() => {
    const convertTime = () => {
      //Convert Start Time
      const [start_hours, start_minutes] = course.data.startTime.split(":");
      const startTmp = new Date(1970, 0, 1, start_hours, start_minutes);

      // Format the time using Intl.DateTimeFormat
      const startTime = startTmp.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const [baseStart, upperStartMeridiem] = startTime.split(" ");
      setConvertedStart(`${baseStart}${upperStartMeridiem.toLowerCase()}`);

      //Convert End Time
      const [end_hours, end_minutes] = course.data.endTime.split(":");
      const endTmp = new Date(1970, 0, 1, end_hours, end_minutes);

      // Format the time using Intl.DateTimeFormat
      const endTime = endTmp.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const [baseEnd, upperEndMeridiem] = endTime.split(" ");
      setConvertedEnd(`${baseEnd}${upperEndMeridiem.toLowerCase()}`);
    };
    // Call the logCourse function when the component is mounted
    convertTime();
  }, []); // Empty dependency array means this effect runs once

  const addCourseCookie= () => {
    //course is stored inside cookie as a JSON
    //You need to use JSON.parse to retrieve the cookie as an object
    Cookies.set(course.data.courseId, JSON.stringify(course));  //Sets cookie course as JSON data
    console.log(course)                                         //Log the course as an object
    console.log(JSON.stringify(course));                        //Log course as a JSON (This is what is inside the cookie)
    console.log(JSON.parse(Cookies.get(course.data.courseId))); //Log the course as an object FROM within the coookie
  };

  const removeCourseCookie = () => {
    //Deletes the cookie by courseId
    Cookies.remove(course.data.courseId)
  };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModalOpen}
      onClose={handleOnClose}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {course.data.Subject}
          {course.data.CourseNum} - {course.data.courseName}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <AccessTimeIcon sx={{ fontSize: "1.4em", marginY: "-5px" }} />{" "}
          {convertedStart} - {convertedEnd}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <CalendarTodayIcon sx={{ fontSize: "1.4em", marginY: "-5px" }} />{" "}
          {course.data.days}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <BusinessIcon sx={{ fontSize: "1.4em", marginY: "-5px" }} /> Location:{" "}
          {course.data.building} Room {course.data.room}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <SchoolIcon sx={{ fontSize: "1.4em", marginY: "-5px" }} /> Professor:{" "}
          {course.data.instructor}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <BorderColorIcon sx={{ fontSize: "1.4em", marginY: "-5px" }} /> Class
          Type: {course.data.LectureType}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <EventSeatIcon sx={{ fontSize: "1.4em", marginY: "-5px" }} /> Number
          of Seats: {course.data.SeatCapacity}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <LanguageIcon sx={{ fontSize: "1.4em", marginY: "-5px" }} /> CRN:{" "}
          {course.data.courseId}
        </Typography>
        <Typography sx={{ textAlign: "right" }}>
          <IconButton onClick={removeCourseCookie}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={addCourseCookie}>
            <AddIcon />
          </IconButton>
        </Typography>
      </Box>
    </Modal>
  );
}
