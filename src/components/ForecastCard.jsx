import React from "react";
import { iconUrlFromCode } from "../utilities/fetchData";

const ForecastCard = ({ item, name, setHourlyForecast }) => {
  const { title, icon, temp, dtText, desc, hour } = item;

  const time = name !== "hourly" ? title : hour;
  const showButton = name !== "hourly" ? true : false;

  return (
    <div className="card">
      <h5>{time}</h5>
      <img
        src={iconUrlFromCode(icon)}
        alt="daily-weather"
        width="80px"
        height="80px"
      />
      <p className="text">
        {Math.round(temp)}&deg; {desc}
      </p>
     
        <button
          type="button"
          onClick={() => setHourlyForecast(dtText)}
          className={showButton ? "btn" : "disable-button"}        
        >
          Check Hourly
        </button>
    
    </div>
  );
};
export default ForecastCard;
