import "./VaccineCalendar.css";

function getDay(date) {
  // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day === 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

// https://www.w3resource.com/javascript-exercises/javascript-date-exercise-3.php
const getDaysInMonth = (month, year) => {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};

const getDaysOfNextMonth = (month, year) => {
  if (month === 12) {
    return Array.from({ length: getDaysInMonth(1, year + 1) }, (_, i) => i + 1);
  } else {
    return Array.from(
      { length: getDaysInMonth(month + 1, year) },
      (_, i) => i + 1
    );
  }
};

// spaces for the first row
// from Monday till the first day of the month
// * * * 1  2  3  4
const addPrefix = (year, month) => {
  let mon = month - 1; // months in JS are 0..11, not 1..12
  let d = new Date(year, mon);
  let prefix = [];
  for (let i = 0; i < getDay(d); i++) {
    prefix.push(<li key={i}></li>);
  }
  return prefix;
};

// add spaces after last days of month for the last row
// 29 30 31 * * * *
const addSuffix = (year, month) => {
  let d = new Date(year, month);
  let suffix = [];
  if (getDay(d) !== 0) {
    for (let i = getDay(d); i < 7; i++) {
      suffix.push(<li key={i}></li>);
    }
  }
  return suffix;
};

const renderDays = (day, pfizer, moderna, month) => {
  switch (day) {
    case pfizer.getDate():
      if (pfizer.getMonth() + 1 === month) {
        return (
          <li key={day}>
            <span className="pfizer">{day}</span>
          </li>
        );
      } else {
        return <li key={day}>{day}</li>;
      }
    case moderna.getDate():
      if (moderna.getMonth() + 1 === month) {
        return (
          <li key={day}>
            <span className="moderna">{day}</span>
          </li>
        );
      } else {
        return <li key={day}>{day}</li>;
      }
    default:
      return <li key={day}>{day}</li>;
  }
};

function VaccineCalendar(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
  ];
  const [y, m, d] = props.firstDose.split("-");

  const firstDoseDate = new Date(
    parseInt(y, 10),
    parseInt(m, 10) - 1,
    parseInt(d, 10)
  );
  let month = firstDoseDate.getMonth() + 1;
  const year = firstDoseDate.getFullYear();

  let pfizer = new Date(firstDoseDate);
  let moderna = new Date(firstDoseDate);
  pfizer.setDate(pfizer.getDate() + 21);
  moderna.setDate(moderna.getDate() + 28);

  const daysOfMonth = Array.from(
    { length: getDaysInMonth(month, year) },
    (_, i) => i + 1
  );
  const daysOfNextMonth = getDaysOfNextMonth(month, year);

  return (
    <>
      <p>
        Your second dose date for Pfizer-BioNTech is {pfizer.getMonth() + 1}/
        {pfizer.getDate()}/{pfizer.getFullYear()} and for Moderna is{" "}
        {moderna.getMonth() + 1}/{moderna.getDate()}/{moderna.getFullYear()}
      </p>
      <div className="month">
        <ul>
          <li>
            {monthNames[firstDoseDate.getMonth()]}
            <br />
            <span style={{ fontSize: "18px" }}>{year}</span>
          </li>
        </ul>
      </div>

      <ul className="weekdays">
        <li>MO</li>
        <li>TU</li>
        <li>WE</li>
        <li>Th</li>
        <li>FR</li>
        <li>SA</li>
        <li>SU</li>
      </ul>
      <ul className="days">
        {addPrefix(year, month)}
        {daysOfMonth.map((day) => renderDays(day, pfizer, moderna, month))}
        {addSuffix(year, month)}
      </ul>
      <div className="month">
        <ul>
          <li>
            {monthNames[firstDoseDate.getMonth() + 1]}
            <br />
            <span style={{ fontSize: "18px" }}>
              {firstDoseDate.getMonth() === 11 ? year + 1 : year}
            </span>
          </li>
        </ul>
      </div>

      <ul className="weekdays">
        <li>MO</li>
        <li>TU</li>
        <li>WE</li>
        <li>Th</li>
        <li>FR</li>
        <li>SA</li>
        <li>SU</li>
      </ul>
      <ul className="days">
        {addPrefix(
          firstDoseDate.getMonth() === 11 ? year + 1 : year,
          firstDoseDate.getMonth() === 11 ? 1 : month + 1
        )}
        {daysOfNextMonth.map((day) =>
          renderDays(
            day,
            pfizer,
            moderna,
            firstDoseDate.getMonth() === 11 ? 1 : month + 1
          )
        )}
        {addSuffix(
          firstDoseDate.getMonth() === 11 ? year + 1 : year,
          firstDoseDate.getMonth() === 11 ? 1 : month + 1
        )}
      </ul>
      <div>
        <ul className="legend">
          <li>
            <span className="pfizer"></span> Pfizer-BioNTech second dose (21
            days)
          </li>
          <li>
            <span className="moderna"></span> Moderna second dose(28 days)
          </li>
        </ul>
      </div>

      <div>
        <a
          href="https://github.com/FerasDA/vaccine-doses"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code on Github
        </a>
      </div>
    </>
  );
}

export default VaccineCalendar;
