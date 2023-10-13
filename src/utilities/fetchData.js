import { DateTime } from "luxon";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "be23682afbc82d1be78869866189fdbd"; // Put here your API key 

const getWeatherData = async (infoType, searchparams) => {
	const url = new URL(BASE_URL + "/" + infoType);
	url.search = new URLSearchParams({ ...searchparams, appid: API_KEY })

	return await fetch(url)
		.then((resp) => resp.json())
}

const formatCurrentWeather = (data) => {
	const {
		coord: { lat, lon },
		main: { temp, feels_like, temp_min, temp_max, humidity },
		name,
		dt,
		sys: { country, sunrise, sunset },
		weather,
		wind: { speed }
	} = data;

	const { main: details, icon } = weather[0];
	return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt: formatToLocalTime(dt, 'cccc, dd LLL yyyy hh:mm a'), country, sunrise, sunset, speed, details, icon }
}

const formatAndGroupForecastWeather = (data) => {
	let { list, city } = data;
	const { name } = city;
	//format the data
	list = list.map(d => {
		return {
			title: formatToLocalTime(d.dt, 'cccc'),
			hour: formatToLocalTime(d.dt, 'hh:mm a'),
			dateToFilter: formatToLocalTime(d.dt, 'yyyy-MM-dd'),
			dtText: d.dt_txt.split(" ")[0],
			temp: d.main.temp,
			icon: d.weather[0].icon,
			desc: d.weather[0].description,
			wind: d.wind.speed
		}
	});

	//groups the data to filter by hours
	const groups = list.reduce((groups, item) => {
		const date = item.dateToFilter;
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(item);
		return groups;
	}, {});

	//getting the daily forecast arr
	const dailyWeather = [];
	for (const value in groups) {
		const max = groups[value].reduce(
			(prev, current) => {
				return prev.temp > current.temp ? prev : current
			}
		);
		dailyWeather.push(max)
	}

	return { groups, dailyWeather, name };
}

const getFormattedWeatherData = async (searchparams) => {
	const currentData = await getWeatherData('weather', searchparams).then(formatCurrentWeather)

	const { lat, lon } = currentData;
	const forecastWeather = await getWeatherData('forecast', {
		lat,
		lon,
		exclude: 'current,minute,alerts',
		units: searchparams.units
	}).then(formatAndGroupForecastWeather)

	return { ...currentData, ...forecastWeather };
};

const formatToLocalTime = (secs, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode }


