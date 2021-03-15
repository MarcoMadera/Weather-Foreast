import Head from "next/head";
import { useEffect, useState } from "react";
import { getFormattedFullDate } from "../lib/utils";
import Chart from "./components/Chart";
import DayCards from "./components/DayCards";
import Input from "./components/Input";
import MainCard from "./components/MainCard";

export default function Home() {
  const [search, setSearch] = useState("London");
  const [cityInfo, setCityInfo] = useState({
    name: "",
    country: "",
    coords: {
      lat: null,
      lon: null,
    },
  });
  const [timeStamps, setTimeStamps] = useState([]);
  const [weather, setWheater] = useState({});
  const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&cnt=24&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  const ONECALL_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.coords?.lat}&lon=${cityInfo.coords?.lon}&exclude=minutely,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  useEffect(() => {
    fetch(FORECAST_API)
      .then((d) => d.json())
      .then(({ city, list }) => {
        setCityInfo({
          name: city.name,
          country: city.country,
          coords: {
            lat: city.coord.lat,
            lon: city.coord.lon,
          },
        });
        setTimeStamps(
          list.map(({ dt_txt, weather, wind, main }) => ({
            date: dt_txt,
            weather: weather[0].main,
            icon: weather[0].icon,
            temp: main.temp,
            humidity: main.humidity,
            windSpeed: wind.speed,
          }))
        );
      });
  }, [search]);

  useEffect(() => {
    if (cityInfo.name) {
      fetch(ONECALL_API)
        .then((d) => d.json())
        .then((data) => {
          setWheater(data);
          setCityInfo((cityInfo) => ({ ...cityInfo, timeZone: data.timezone }));
        });
    }
  }, [cityInfo.name]);
  useEffect(() => {
    let temps = [];
    let timelabels = [];
    if (weather && selectedCard === 0) {
      weather?.hourly?.forEach(({ temp, dt }, i) => {
        if (i % 3 === 0 && i <= 24) {
          temps.push(temp);
          timelabels.push(getFormattedFullDate(dt * 1000));
        }
      });
      setData(temps);
      setLabels(timelabels);
    } else {
      timeStamps.forEach(({ temp, date }, i) => {
        if (i <= selectedCard * 8 && i >= (selectedCard - 1) * 8) {
          temps.push(temp);
          timelabels.push(date);
        }
      });
      setData(temps);
      setLabels(timelabels);
    }
  }, [weather, timeStamps, selectedCard]);

  return (
    <div>
      <main>
        <Head>
          <title>Weather Forecast</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Input setSearch={setSearch} />
        <MainCard
          cityInfo={cityInfo}
          weather={weather}
          selectedCard={selectedCard}
        />
        <Chart data={data} labels={labels} />
        {weather && (
          <DayCards
            weather={weather}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          />
        )}
      </main>
      <style jsx>
        {`
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px 64px;
            width: 100vw;
            height: 100vh;
          }
          main {
            height: 100%;
            align-items: center;
            justify-content: center;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-template-rows: 50px 200px 1fr;
            grid-template-areas: "input ." "mainCard chart" "mainCard dayCards";
            padding: 50px 35px;
            width: 100%;
            height: 100%;
            box-shadow: rgb(225, 237, 255) 4px 4px 0 0;
            border-radius: 10px;
            background-color: white;
          }
        `}
      </style>
    </div>
  );
}
