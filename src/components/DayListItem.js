import React from "react";
import classNames from "classnames"
import stylesDayListItem from "components/DayListItem.scss"

export default function DayListItem(props) {

  const { selected, spots, setDay } = props

  const dayClass = classNames(
    "day-list__item",
    {"day-list__item--selected": selected},
    {"day-list__item--full": spots === 0}
  );

  const formatSpots = () => {
    if (spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return "1 spot remaining"
    } else {
      return `${spots} spots remaining`
    }
  } 

  return (
    <li onClick={() => setDay(props.name)} className={dayClass} selected={selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}