import React from "react";
import { Day } from "./Day";

export const Weather = ({ weather }) => {
  if (!weather.daily) return <p>No weather data available.</p>;

  return (
    <ul className="weather">
      {weather.daily.time.map((date, i) => (
        <Day
          key={i}
          date={date}
          max={weather.daily.temperature_2m_max[i]}
          min={weather.daily.temperature_2m_min[i]}
          code={weather.daily.weathercode[i]}
          isToday={i === 0}
        />
      ))}
    </ul>
  );
};
