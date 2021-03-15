import { useEffect, useState } from "react";
import { getFormattedDate } from "../lib/utils";

const MiniCard = ({ data, today, selectedCard, setSelectedCard, i }) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (selectedCard === i) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedCard, i]);
  function handleClick(e) {
    e.preventDefault();
    setSelectedCard(i);
  }
  return (
    <button onClick={handleClick}>
      <p>
        <strong>{today ? "Today" : getFormattedDate(data.date)}</strong>
      </p>
      <img src={`/icons/${data.icon}.png`} alt="" />
      <p>Humidity</p>
      <p>{data.humidity}%</p>
      <style jsx>{`
        button {
          border: none;
          background-color: ${selected ? "rgb(85,150,246)" : "unset"};
          color: ${selected ? "#ffffff" : "#000000"};
          width: 180px;
          height: 200px;
          border-radius: 10px;
          text-align: center;
          padding: 0;
          margin: 0;
          cursor: pointer;
          font: inherit;
        }
        img {
          width: 40px;
          height: auto;
        }
        button:focus {
          border: none;
          outline: none;
        }
        @media screen and (max-width: 520px) {
          button {
            width: 100%;
          }
        }
      `}</style>
    </button>
  );
};

export default MiniCard;
