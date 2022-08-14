import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import stylesInterviewerList from "components/InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList (props) {
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
  });

  return (
    <section className={stylesInterviewerList}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {renderInterviewers}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;