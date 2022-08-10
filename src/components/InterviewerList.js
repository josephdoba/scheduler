import React, { useState } from 'react';
import InterviewerListItem from './InterviewerListItem';
import stylesInterviewerList from "components/InterviewerList.scss";

export default function InterviewerList (props) {
  const { interviewers, value, onChange } = props

  const renderInterviewers = interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}    
      />
    )
  })

  return (
    <section className={stylesInterviewerList}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {renderInterviewers}
      </ul>
    </section>
  );

  // why did commenting literally this entire function work?
  // Sorta... it doesnt render an interview list per day now 
  // return null;
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
