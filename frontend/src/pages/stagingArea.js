import CreateCard from "./createCard";
import { useState, useEffect } from "react";
import api from "./services/apis";

export default function StagingArea() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await api.get("/cards");        
        setCards(res.data.filter((el) => !el.published));
      } catch (error) {
        alert("not authorized, please log in first");
      }
    }
    fetchCards();
  }, []);
  return (
    <>
      <h1 className="text-4xl text-center">Cards</h1>
      <div className="flex flex-wrap">
        {cards.map((el) => (
          <CreateCard
            id={el.id}
            name={el.name}
            type={el.type}
            region={el.region}
            tier={el.tier}
            description={el.description}
            strength={el.strength}
            health={el.health}
            published={true}
          />
        ))}
      </div>
    </>
  );

}
