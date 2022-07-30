import React from 'react';

export default function Show (props) {
  console.log(props)

  const { student, interviewer, onEdit, onDelete } = props

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
          <h2 className="text--regular">{student}</h2>
        <section className="interviewer"> 
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{interviewer}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            onClick={onEdit}
            src="images/edit.png"
            alt="Edit"
          />
          <img
            className="appointment__actions-button"
            onClick={onDelete}
            src="images/trash.png"
            alt="Delete"
          />
        </section>
      </section>
    </main>
  )

}