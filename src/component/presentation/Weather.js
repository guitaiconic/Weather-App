import React from "react";
import { Day } from "./Day";

export const Weather = ({ weather, location }) => {
  if (!weather.daily || !weather.daily.time) {
    return <p>No weather data available.</p>;
  }

  const {
    temperature_2m_max: max = [],
    temperature_2m_min: min = [],
    time: dates = [],
    weathercode: codes = [],
  } = weather.daily;

  return (
    <div>
      <h2>{location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            key={date}
            date={date}
            max={max[i]}
            min={min[i]}
            code={codes[i]}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
};
