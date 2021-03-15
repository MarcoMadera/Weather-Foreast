import { useEffect, useState } from "react";
import { getFormattedFullDate } from "../../lib/utils";

const MainCard = ({ weather, selectedCard }) => {
  const [data, setData] = useState({
    date: "",
    temp: "",
    humidity: "",
    weather: "",
    icon: "",
    windSpeed: "",
  });
  const currentDay = {
    date: weather?.current?.dt * 1000,
    temp: weather?.current?.temp,
    humidity: weather?.current?.humidity,
    weather: weather?.current?.weather[0].main,
    icon: weather?.current?.weather[0].icon,
    windSpeed: weather?.current?.wind_speed,
  };

  useEffect(() => {
    if (!(selectedCard === 0)) {
      setData({
        date: weather?.daily[selectedCard]?.dt * 1000,
        temp: weather?.daily[selectedCard]?.temp.day,
        humidity: weather?.daily[selectedCard]?.humidity,
        weather: weather?.daily[selectedCard]?.weather[0].main,
        icon: weather?.daily[selectedCard]?.weather[0].icon,
        windSpeed: weather?.daily[selectedCard]?.wind_speed,
      });
    } else {
      setData(currentDay);
    }
  }, [weather, selectedCard]);
  return (
    <div>
      <p className="date">{getFormattedFullDate(data.date)}</p>
      <p className="middleImage">
        <img src={`/icons/${data.icon}.png`} alt="" />{" "}
        <span>
          {data.temp} <sup>&deg;C</sup>
        </span>
      </p>
      <p className="weather">{data.weather}</p>
      <section>
        <span>
          Humidity<p>{data.humidity}%</p>
        </span>
        <span>
          Wind Speed<p>{data.windSpeed}km/hr</p>
        </span>
      </section>
      <style jsx>{`
        .date {
          font-size: 18px;
          color: rgb(102, 102, 102);
        }
        .middleImage {
          display: flex;
          align-items: center;
          margin: 0;
        }
        .middleImage span {
          color: #000;
          font-size: 50px;
          font-weight: 700;
        }
        .weather {
          margin: 0 0 20px 0;
          font-size: 40px;
          font-weight: 700;
          color: #000;
        }
        sup {
          font-size: 20px;
          font-weight: 700;
        }
        div {
          grid-area: mainCard;
          width: 100%;
          height: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        section {
          display: flex;
          justify-content: center;
        }
        span {
          color: rgb(148, 148, 148);
          margin: 0 10px;
        }
        p {
          color: #000000;
        }
      `}</style>
    </div>
  );
};

export default MainCard;
