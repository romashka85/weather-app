import { useEffect, useState } from "react";
import SearchLocation from "./components/SearchLocation";
import CurrentWeather from "./components/CurrentWeather";
import getFormattedWeatherData from "./utilities/fetchData";
import Header from "./components/Header";
import ForecastList from "./components/ForecastList";
import Loader from "./components/Loader";

const App = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState("");

  useEffect(() => {
    if (query) {
      const fetchWeather = async () => {
        try {
          const data = await getFormattedWeatherData({ ...query, units });
          setWeather(data);
          setIsError(false);
          setIsLoading(false);         
        } catch (error) {
          setIsError("There was an error...");
        }
      };
      fetchWeather();
    }
  }, [query, units]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setIsError("Geolocation not supported");    }

    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setQuery({ lat, lon });
    }
    function error() {
      setIsError("Unable to retrieve your location");
    }
  };

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const searchCity = (city) => {
    setQuery({ q: city });   
  };

  return (
    <>
      <Header />
      <SearchLocation
        searchCity={searchCity}
        units={units}
        setUnits={setUnits}
      />
      {isError && <h3 className="wrapper">{isError}</h3>}
      <Loader isLoading={isLoading}>
        {weather && (
          <main>
            <CurrentWeather weather={weather} />
            <ForecastList
              weather={
                !hourlyForecast
                  ? weather.dailyWeather
                  : weather.groups[hourlyForecast]
              }
              title={!hourlyForecast ? "daily" : "hourly"}
              setHourlyForecast={setHourlyForecast}
              hourlyForecast={hourlyForecast}
            />
          </main>
        )}
      </Loader>
    </>
  );
};
export default App;
