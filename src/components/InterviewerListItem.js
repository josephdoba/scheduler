import React, { useState } from 'react';
import stylesInterviewerListItem from "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props) {

  const { name, avatar, selected, setInterviewer } = props // deconstructed the props

  const InterviewerListClass = classNames("interviewers__item",{
    "interviewers__item--selected": selected
  });
 
  return(
    <li onClick={setInterviewer} className={InterviewerListClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}

/*
Component creation steps
To build our new components, we should follow the same steps as before.

Create a file with our component name [x]
Create & Export the component function [x]
Add the base HTML in the return statement of our component [x]
Create & Import a CSS / SCSS file holding the style of our component [x]
Write stories for Storybook to render our component in isolation [x]
Refactor the hardcoded content to use props & state [x]
*/