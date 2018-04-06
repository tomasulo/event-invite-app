import React from "react";

export const Attendance = (props) => (
    <div>
        <ul>
            {props.attendance.map(function (attendee, index) {
                return <li key={index}>{attendee.name}: {attendee.rsvp}</li>;
            })}
        </ul>
    </div>
);