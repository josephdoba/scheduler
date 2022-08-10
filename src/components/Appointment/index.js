import React, { Fragment } from 'react';
import styleAppointment from 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import { getInterviewersForDay } from 'helpers/selectors';

  // mode consts declaration:
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  // const CONFIRM = "CONFIRM";
  // const SAVING = "SAVING";
  // const EDIT = "EDIT";
  // const DELETING = "DELETING";
  
  export default function Appointment (props) {
    console.log(props)
    
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
      const interview = {
        student: name,
        interviewer
      };
      console.log(interview)
      return interview;
    }

  return (
    <article className={styleAppointment}>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE)
      }} />}
      
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />)}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers} 
        onCancel={() => {transition(EMPTY)}}
        onSave={() => {save("Carl", "Beef")}}/>
        // onSave={() => {console.log(save("John", "Smith"))}}/>
      )}
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
