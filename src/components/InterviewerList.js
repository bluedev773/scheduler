import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

    const { interviewers } = props;

    const parsedInterviewers = interviewers.map((interviewer) => Array.isArray(interviewers) && <InterviewerListItem key={interviewer.id} {...interviewer} selected={interviewer.id === props.value} setInterviewer={() => props.onChange(interviewer.id)}/>);

    return(
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {parsedInterviewers}
            </ul>
        </section>
    );
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};