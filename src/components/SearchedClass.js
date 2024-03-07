import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Divider } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ClassModal from "./ClassModal";

import { useState, useEffect } from "react";

export default function SearchedClass(course) {
  const [convertedStart, setConvertedStart] = React.useState("");
  const [convertedEnd, setConvertedEnd] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 0.2,
          width: 600,
          height: 95,
        },
        cursor: "pointer", // Add cursor style for clickability
      }}
      onClick={!isModalOpen ? openModal : undefined} // Only assign onClick if isModalOpen is false
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          px: 2,
        }}
      >
        <Typography paddingTop={"1ch"} paddingBottom={".4ch"}>
          <ImportContactsIcon sx={{ fontSize: ".9m", marginY: "-5px" }} />{" "}
          {course.data.Subject}
          {course.data.CourseNum} - {" "}
          {course.data.LectureType}
        </Typography>
        <Typography
          sx={{ fontSize: "0.9em", opacity: 0.8 }}
          paddingLeft={".4ch"}
          paddingBottom={".4ch"}
        >
          <AccessTimeIcon sx={{ fontSize: "1.4em", marginY: "-4px" }} />{" "}
          {convertedStart} - {convertedEnd}
        </Typography>
        <Typography
          sx={{ fontSize: "0.9em", opacity: 0.8 }}
          paddingLeft={".4ch"}
        >
          <CalendarTodayIcon sx={{ fontSize: "1.4em", marginY: "-4px" }} />{" "}
          {course.data.days}
        </Typography>
      </Paper>
      {/* Render ClassModal if isModalOpen is true */}
      {isModalOpen && (
        <ClassModal
          course={course}
          handleOnClose={closeModal} // Pass the onClose function to close the modal
          isModalOpen = {isModalOpen}
        />
      )}
    </Box>
  );
}

/* Note the schema for course.data
data: 
    CourseNum: "111"
    LectureType: "Lecture"
    SeatCapacity: 148
    Subject: "CS"
    Units: 4
    building: "SSC"
    courseId: "53113"
    courseName: "DISCRETE STRUCTURES"
    days: "Mon,Wed"
    endTime: "16:50:00"
    instructor: "Strzheletska, Elena"
    room: "235"
    startTime: "15:30:00"
    term: "202420"
*/
