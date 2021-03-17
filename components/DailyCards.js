import { unknownWeather } from "../lib/defaultData";
import MiniCard from "./MiniCard";

export default function DailyCards({
  dailyWeather,
  setSelectedCard,
  selectedCard,
}) {
  return (
    <div>
      {[1, 2, 3, 4].map((val, i) => {
        return (
          <MiniCard
            key={dailyWeather.date || val}
            data={dailyWeather[i] || unknownWeather}
            i={i}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        );
      })}
      <style jsx>{`
        div {
          grid-area: dailyCards;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0 8px;
        }
      `}</style>
    </div>
  );
}
