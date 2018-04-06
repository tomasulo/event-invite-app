import React from "react";

// TODO attendance count
export const Attendance = ({attendance}) => (
    <ul>
        {attendance.map(function (attendee, index) {
            return <li key={index}>{attendee.name}: {attendee.rsvp}</li>;
        })}
    </ul>
);