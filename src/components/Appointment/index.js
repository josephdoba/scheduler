import React, { Fragment } from 'react';
import styleAppointment from 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

  // mode consts declaration:
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  // const CONFIRM = "CONFIRM";
  // const SAVING = "SAVING";
  // const EDIT = "EDIT";
  // const DELETING = "DELETING";
  
  export default function Appointment (props) {
    
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

  return (
    <article className={styleAppointment}>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("onAdd clicked")
        
      }} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />)}
      {mode === CREATE && (
        <the component goes here/>
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
