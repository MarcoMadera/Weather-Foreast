async function getForeCast(city) {
  try {
    const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=31&appid=${process.env.WEATHER_KEY}`;
    const response = await fetch(FORECAST_API);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getData(lat, lon) {
  try {
    const ONECALL_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${process.env.WEATHER_KEY}`;
    const response = await fetch(ONECALL_API);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getWeather(lat, lon) {
  try {
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`;
    const response = await fetch(WEATHER_API);

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

const mapCityData = (city, list) => {
  const cityInfo = {
    name: city.name,
    country: city.country,
    coords: {
      lat: city.coord.lat,
      lon: city.coord.lon,
    },
  };
  let foreCast = [];
  list.forEach(({ dt, weather, wind, main }, i) => {
    if (i > 6) {
      foreCast.push({
        date: dt * 1000,
        weather: weather[0].main,
        icon: weather[0].icon,
        temp: main.temp,
        humidity: main.humidity,
        windSpeed: wind.speed,
      });
    }
  });
  return { cityInfo, foreCast };
};

const mapCoordsData = (coordsData, weatherData) => {
  const { current, daily, hourly, timezone } = coordsData;
  const { name, sys } = weatherData;
  const currentWeather = {
    date: current.dt * 1000,
    temp: current.temp,
    weather: current.weather[0].main,
    icon: current.weather[0].icon,
    humidity: current.humidity,
    windSpeed: current.wind_speed,
  };
  const cityInfo = {
    name: name,
    country: sys.country,
    timeZone: timezone,
  };
  let dailyWeather = [];
  daily.forEach(({ dt, temp, humidity, weather, wind_speed }, i) => {
    if (i <= 3) {
      dailyWeather.push({
        date: dt * 1000,
        temp: temp.day,
        weather: weather[0].main,
        icon: weather[0].icon,
        humidity: humidity,
        windSpeed: wind_speed,
      });
    }
  });
  let todayThreeHoursWeather = [];
  hourly.forEach(({ dt, temp, humidity, weather, wind_speed }, i) => {
    if (i % 3 === 0 && i < 24) {
      todayThreeHoursWeather.push({
        date: dt * 1000,
        temp: temp,
        weather: weather[0].main,
        icon: weather[0].icon,
        humidity: humidity,
        windSpeed: wind_speed,
      });
    }
  });
  return { cityInfo, currentWeather, dailyWeather, todayThreeHoursWeather };
};

export default async (req, res) => {
  if (req.query.city) {
    try {
      const data = await getForeCast(req.query.city);
      const { city, list } = data;
      const result = mapCityData(city, list);
      return res.status(200).json(result);
    } catch {
      return res.status(403).json("Invalid");
    }
  }

  if (req.query.lat && req.query.lon) {
    try {
      const coordsData = await getData(req.query.lat, req.query.lon);
      const weatherData = await getWeather(req.query.lat, req.query.lon);
      const resolvedData = await Promise.all([coordsData, weatherData]);
      const [resolvedCoordsData, resolvedWeatherData] = resolvedData;
      const data = mapCoordsData(resolvedCoordsData, resolvedWeatherData);

      return res.status(200).json(data);
    } catch {
      return res.status(403).json("Invalid");
    }
  }
  return res.status(400).json({ message: "Bad Request" });
};
