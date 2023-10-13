import React from 'react';
import { useState } from "react";

const SearchLocation = ({ units, setUnits, searchCity }) => { 
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) {
      return;
    }
    searchCity(city);
    setCity("");
  };

  const handleUnits = (e) => {
    const selectedUnit = e.currentTarget.name;   
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };

  return (
    <section className="search ">
      <div className="wrapper">
        <form className="search-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for city..."
            />
            <button className="btn search-btn" type="submit">
              Search
            </button>
          </div>

          <div className="metric-container">
            <button
              type="button"
              name="metric"
              className="btn metric"
              onClick={handleUnits}
            >
              &deg;C
            </button>
            <button
              type="button"
              name="imperial"
              className="btn imperial"
              onClick={handleUnits}
            >
              &deg;F
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default SearchLocation;
