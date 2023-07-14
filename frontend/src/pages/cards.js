import Card from "./components/card";
import { useState, useEffect } from "react";
import api from "./services/apis";
import { Link } from "react-router-dom";

export default function Cards({ region }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await api.get("/cards");
        if (region) {
          setCards(
            res.data.filter((el) => el.published && el.region === region)
          );
        } else setCards(res.data.filter((el) => el.published));
      } catch (error) {
        alert("not authorized, please log in first");
      }
    }
    fetchCards();
  }, [region]);
  function CardTier({ tier }) {
    return cards
      .filter((el) => el.tier === tier)
      .map((el) => (
        <Card
          id={el.id}
          name={el.name}
          type={el.type}
          region={el.region}
          tier={el.tier}
          description={el.description}
          strength={el.strength}
          health={el.health}
        />
      ));
  }
  return (
    <>
      <ul className="flex items-center">
        <li key={6} className="ml-2">
          region:
        </li>
        <li key={7} className="mx-2">
          <Link className="subMenu" to="/cards/humans">Humans</Link>
        </li>
        <li key={8} className="mx-2">
          <Link className="subMenu" to="/cards/elfs">Elfs</Link>
        </li>
        <li key={9} className="mx-2">
          <Link className="subMenu" to="/cards/dwarves">Dwarves</Link>
        </li>
        <li key={10} className="mx-2">
          <Link className="subMenu" to="/cards/deamons">Deamons</Link>
        </li>
      </ul>
      <h1>{region ? region : "Cards"}</h1>
      <h2>Basic cards</h2>
      <div className="flex flex-wrap">
        <CardTier tier={0} />
      </div>
      <h2>Tier 1</h2>
      <div className="flex flex-wrap">
        <CardTier tier={1} />
      </div>
      <h2>Tier 2</h2>
      <div className="flex flex-wrap">
        <CardTier tier={2} />
      </div>
      <h2>Tier 3</h2>
      <div className="flex flex-wrap">
        <CardTier tier={3} />
      </div>
    </>
  );
}
