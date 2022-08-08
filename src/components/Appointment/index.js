import React, { Fragment } from 'react';
import styleAppointment from 'components/Appointment/styles.scss' //style for appointments

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment (props) {
  // console.log("--------- All Props: --------- ")
  // console.log(props)

  
  // console.log("--- Id: ---")
  // console.log(props.id)
  // console.log("--- Time: ---")
  // console.log(props.time)
  // console.log("--- Interview object: ---")
  // console.log(props.interview)

  // i'm stuck because I don't understand why I am unable to pass objects as a reference into the props
  // Do you need to deconstruct the object?? props.interview.interviewer.id format doesnt work.. Cannot read properties of undefined (reading 'interviewer')

  // What were you passing in? - my conditional statement was props.id - When we needed to pass props.interview, since that was an actual object instead of an integer within the ternary operator statement.

  return (
    <article className={styleAppointment}>
      <Header time={props.time}/>
      <Fragment>
        {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
      </Fragment>
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
