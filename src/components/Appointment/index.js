import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import { getInterviewersForDay } from 'helpers/selectors';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';

  // mode consts declaration:
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "Are you sure you want to delete this appointment?";
  const DELETING = "Deleting";
  const SAVING = "Saving";

  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  export default function Appointment (props) {
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    // Save new appointment:
    function save(name, interviewer) {
      transition(SAVING)
      const interview = {
        student: name,
        interviewer
      };
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))

      // can there only be one transition used per function?? probably not, that wouldn't make sense. OH ITS TRUE.. perhaps theres an async issue happening

      // Resolved -  because you wrote .then(transition(SHOW), instead of .then(() => transition(SHOW)

    }

    // Delete Interview:
    function deleteInterview() {
      transition(DELETING)

      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    }    

  return (
    <article className="appointment" data-testid="appointment">
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
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
          />
      )}

      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}

      {mode === ERROR_SAVE && <Error message={"Something went wrong with saving"} onClose={()=>{back()}} />}
      {mode === ERROR_DELETE && <Error message={"Something went wrong with deleting"}onClose={()=>{back(); back()}} />}

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
