import { useState } from "react";
import VaccineCalendar from "./VaccineCalendar";

import "./App.css";

function App() {
  const [firstDose, setFirstDose] = useState("");

  const handleChange = (e) => {
    setFirstDose(e.target.value);
  };

  return (
    <div className="App">
      <h1>VACCINE INTERVAL BETWEEN DOSES</h1>

      <div>
        <p>
          The{" "}
          <a
            href="https://www.cdc.gov/vaccines/covid-19/info-by-product/clinical-considerations.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            CDC guidelines
          </a>{" "}
          state that second dose of the vaccines should be administered as close
          to the recommended interval as possible.
        </p>
        {/* <p>
          However, second doses administered within a grace period of 4 days
          earlier than the recommended date for the second dose are still
          considered valid. If it is not feasible to adhere to the recommended
          interval and a delay in vaccination is unavoidable, the second dose of
          Pfizer-BioNTech and Moderna COVID-19 vaccines may be administered up
          to 6 weeks (42 days) after the first dose. Currently, only limited
          data are available on efficacy of mRNA COVID-19 vaccines administered
          beyond this window.
        </p> */}
      </div>

      <h3> Choose your First Dose date:</h3>
      <form method="post" onChange={handleChange} className="form">
        <div>
          <input
            type="date"
            id="start"
            name="firstDose"
            min="2020-01-01"
            max="2024-12-31"
            onChange={handleChange}
          ></input>
        </div>
      </form>

      {firstDose ? <VaccineCalendar firstDose={firstDose} /> : ""}
    </div>
  );
}

export default App;
