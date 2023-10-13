import ForecastCard from "./ForecastCard";
import { nanoid } from "nanoid";

const ForecastList = ({ weather, title, setHourlyForecast, hourlyForecast }) => { 
  return (
    <section>
      <div className="wrapper">
        {hourlyForecast && <button className="btn go-back" type="button" onClick={()=> setHourlyForecast("")}>go back</button>} 
        <div className="card-list">
        {weather.map((item, index) => {
          return <ForecastCard key={nanoid()} item={item} name={title} setHourlyForecast={setHourlyForecast}/>;
        })}        
        </div>            
      </div>
    </section>
  );
};
export default ForecastList;
