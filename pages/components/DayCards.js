import MiniCard from "./MiniCard";

export default function DayCards({ weather, setSelectedCard, selectedCard }) {
  const currentDay = {
    date: weather?.current?.dt * 1000,
    temp: weather?.current?.temp,
    humidity: weather?.current?.humidity,
    weather: weather?.current?.weather[0].main,
    icon: weather?.current?.weather[0].icon,
  };
  const weekDays = weather?.daily?.map(({ dt, temp, humidity, weather }) => ({
    date: dt * 1000,
    temp: temp.day,
    humidity: humidity,
    weather: weather[0].main,
    icon: weather[0].icon,
  }));
  return (
    <div>
      <MiniCard
        data={currentDay}
        today={true}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        i={0}
      />
      {weekDays?.map((data, i) => {
        if (i <= 3 && i > 0) {
          return (
            <MiniCard
              key={data.date}
              data={data}
              i={i}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          );
        }
      })}
      <style jsx>{`
        div {
          grid-area: dayCards;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
