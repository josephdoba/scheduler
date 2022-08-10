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

    // Save new appointment:
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };

     


      props.bookInterview(props.id, interview)
        transition(SHOW);
 
    }

    // Edit existing interview:

    // couple ways you can solve this

    // Perhaps we can use an if statement within the book interview function, that checks if the interview already exists and makes a call to the APi to axios.edit instead of axios.put ? 

    // or

    // perhaps its not needed, because its already retrieving the student name and its already posting the update via the save function. Just needs the instructor name from the appointment we're trying to edit

    // Delete Interview:
    function deleteInterview() {
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
      onEdit={() => {transition(EDIT)}}
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
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={(prev) => {back(prev)}}
          onSave={save}
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
