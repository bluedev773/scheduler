import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
    const { days } = props;
    const parsedDays = days.map((day) => Array.isArray(days) && <DayListItem key={day.id} {...day} selected={day.name === props.value} setDay={props.onChange}/>);
    return (
        <ul>
            {parsedDays}
        </ul>
    );
}