import { getFormattedFullDate } from "../lib/utils";

const MainCard = ({ dailyWeather, cityInfo }) => {
  const { date, icon, temp, weather, humidity, windSpeed } = dailyWeather;
  return (
    <div>
      <p className="cityName">
        {cityInfo.name}, {cityInfo.country}
      </p>
      <p className="date">{getFormattedFullDate(date || Date())}</p>
      <p className="middleImage">
        <img src={`/icons/${icon}.png`} alt="" />{" "}
        <span>
          {temp} <sup>&deg;C</sup>
        </span>
      </p>
      <p className="weather">{weather}</p>
      <section>
        <span>
          Humidity<p>{humidity}%</p>
        </span>
        <span>
          Wind Speed<p>{windSpeed} km/hr</p>
        </span>
      </section>
      <style jsx>{`
        .cityName {
          margin: 0;
        }
        .date,
        .cityName {
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
        @media screen and (min-width: 1024px) and (max-width: 1140px) {
          .middleImage {
            display: grid;
            justify-content: center;
          }
        }
        @media screen and (max-width: 520px) {
          .middleImage {
            display: grid;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default MainCard;
