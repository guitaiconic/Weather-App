import React, { useEffect, useState } from "react";
import { Weather } from "./Weather";

const convertToFlag = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [displayLocation, setDisplayLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      async function fetchWeather() {
        if (!location) return;

        setIsLoading(true);
        setError(null);

        try {
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();

          if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Location not found");
          }

          const { name, country_code, latitude, longitude, timezone } =
            geoData.results[0];

          setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );

          const weatherData = await weatherRes.json();
          setWeather(weatherData);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchWeather();
    },
    [location]
  );

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Search for location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{displayLocation}</h2>
          <Weather weather={weather} />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
