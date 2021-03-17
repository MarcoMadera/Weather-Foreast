import { useEffect, useState } from "react";
import { getFormattedFullDate } from "../lib/utils";
import Chart from "../components/chart";
import DailyCards from "../components/DailyCards";
import Input from "../components/Input";
import MainCard from "../components/MainCard";
import { unknownWeather } from "../lib/defaultData";
import Seo from "../components/Seo";

export default function Home() {
  const [search, setSearch] = useState("London");
  const [cityInfo, setCityInfo] = useState({
    name: "London",
    country: "GB",
    coords: {
      lat: null,
      lon: null,
    },
  });
  const [timeStamps, setTimeStamps] = useState([]);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [currentWeather, setCurrentWeather] = useState();
  const [dailyWeather, setDailyWeather] = useState([]);
  const [todayThreeHoursWeather, setTodayThreeHoursWeather] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    fetch(`/api/weather?city=${search}`)
      .then((d) => d.json())
      .then(({ cityInfo, foreCast }) => {
        setCityInfo(cityInfo);
        setTimeStamps(foreCast);
      })
      .catch(() => {
        setError("Not Found");
      });
  }, [search]);

  useEffect(() => {
    if (cityInfo.coords?.lat && cityInfo.coords?.lon) {
      setError("");
      fetch(
        `/api/weather?lat=${cityInfo.coords.lat}&lon=${cityInfo.coords.lon}`
      )
        .then((d) => d.json())
        .then((data) => {
          setCurrentWeather(data.currentWeather);
          setDailyWeather(data.dailyWeather);
          setTodayThreeHoursWeather(data.todayThreeHoursWeather);
          setCityInfo((cityInfo) => ({ ...cityInfo, ...data.cityInfo }));
        })
        .catch(() => {
          setError("Not Found");
        });
    }
  }, [cityInfo.coords?.lat, cityInfo.coords?.lon]);

  useEffect(() => {
    let temps = [];
    let timelabels = [];
    if (todayThreeHoursWeather && selectedCard === 0) {
      setData(todayThreeHoursWeather.map(({ temp }) => temp));
      setLabels(
        todayThreeHoursWeather.map(({ date }) => getFormattedFullDate(date))
      );
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
  }, [timeStamps, selectedCard, todayThreeHoursWeather]);

  return (
    <div>
      <main>
        <Seo />
        <Input
          cityInfo={cityInfo}
          setSearch={setSearch}
          setCityInfo={setCityInfo}
          error={error}
          setError={setError}
        />
        <MainCard
          currentWeather={currentWeather}
          cityInfo={cityInfo}
          displayWeather={
            (selectedCard === 0
              ? currentWeather
              : dailyWeather[selectedCard]) || unknownWeather
          }
        />
        <Chart data={data} labels={labels} />
        <DailyCards
          dailyWeather={dailyWeather || unknownWeather}
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
        />
      </main>
      <style jsx>
        {`
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px 64px;
            width: 100vw;
            min-height: 100vh;
          }
          main {
            height: 100%;
            align-items: center;
            justify-content: center;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
            grid-template-rows: 50px 200px 1fr;
            grid-template-areas: "input input" "mainCard chart" "mainCard dailyCards";
            padding: 50px 35px;
            width: 100%;
            max-width: 1440px;
            height: 100%;
            box-shadow: rgb(225, 237, 255) 4px 4px 0 0;
            border-radius: 10px;
            background-color: white;
          }
          @media screen and (max-width: 1140px) {
            main {
              grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
            }
          }
          @media screen and (max-width: 1024px) {
            main {
              display: block;
            }
            main > :global(*) {
              margin-bottom: 20px;
            }
          }
          @media screen and (max-width: 524px) {
            div {
              padding: 25px 32px;
            }
          }
        `}
      </style>
    </div>
  );
}
