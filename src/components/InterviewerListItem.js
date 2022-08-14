import React from 'react';
import stylesInterviewerListItem from "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props) {

  const { name, avatar, selected, setInterviewer } = props

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
  );
};