import React from "react";
import { iconUrlFromCode } from "../utilities/fetchData";
const CurrentWeather = ({ weather }) => {  
  const {
    dt,
    icon,
    temp,
    humidity,
    feels_like,
    speed,
    name,
    temp_max,
    temp_min,
    details,
  } = weather; 

  return (
    <section className="current-weather">
      <div className="wrapper">
        <h5 className="current-weather-time">{dt}</h5>
        <div className="current-weather-temp">
          <h3 className="current-weather-header">{name}</h3>
          <img
            src={iconUrlFromCode(icon)}
            alt="current-weather"
            className="current-weather-icon"
          />
          <h3>{Math.round(temp)}°</h3>
        </div>
        <p className="text-bold text">
          Feels like {Math.round(feels_like)}°. {details}.
        </p>
        <p className="text-small">
          Humidity: {humidity}% | Wind: {speed}km/h | High: {Math.round(temp_max)}° |
          Low: {Math.round(temp_min)}°
        </p>
      </div>
    </section>
  );
};
export default CurrentWeather;
