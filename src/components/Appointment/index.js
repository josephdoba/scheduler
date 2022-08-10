import React, { Fragment } from 'react';
import styleAppointment from 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import { getInterviewersForDay } from 'helpers/selectors';
import Confirm from './Confirm';
import Status from './Status';

  // mode consts declaration:
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETING = "Deleting...";
  const CONFIRM = "Are you sure you want to delete this appointment?";
  const SAVING = "Saving...";
  const EDIT = "EDIT";
  
  export default function Appointment (props) {
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );


    // book appointment:
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)

      props.bookInterview(props.id, interview)
      transition(SHOW);
    }

    function deleteInterview() {
      console.log("deleting log was clicked from index.js")
      transition(DELETING)

      props.cancelInterview(props.id)
        .then(() => {
          transition(EMPTY);
        })
        .catch((err) => {
          console.log(err);
        });
    }    

  return (
    <article className={styleAppointment}>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE)
      }} />}
      
      {mode === SHOW && props.interview && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => {console.log("Edit was clicked")}}
      onDelete={() => transition(CONFIRM)}
      />)}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers} 
        onCancel={() => {transition(EMPTY)}}
        onSave={save}/>
      )}
      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          onCancel={((prev)=> back(prev))}
          onConfirm={deleteInterview}
        />
      )}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === SAVING && <Status message={SAVING} />}
    </article>
  
  );
};


/*
Component creation steps
To build our new components, we should follow the same steps as before.

Create a file with our component name [X]
Create & Export the component function [X]
Add the base HTML in the return statement of our component [X]
Create & Import a CSS / SCSS file holding the style of our component [X]
Write stories for Storybook to render our component in isolation [X]
Refactor the hardcoded content to use props & state [X]
*/
