import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    const reset = () => {
        setStudent("");
        setInterviewer("");
    }

    const cancel = () => {
        reset();
        props.onCancel();
    }
    // const save = () => {
    //     props.onSave(student, interviewer);
    // }

      function validate() {
        if (student === "") {
          setError("Student name cannot be blank");
          return;
        }
      
        setError("");
        props.onSave(student, interviewer);
      }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        data-testid="student-name-input"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={student}
                        onChange={(event) => setStudent(event.target.value)}
                    />
                    <section className="appointment__validation">{error}</section>
                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    value={interviewer}
                    onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={() => validate()}>Save</Button>
                </section>
            </section>
        </main>
    );
}