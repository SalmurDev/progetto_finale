import { GiBroadsword } from "react-icons/gi";
import { BsShieldShaded } from "react-icons/bs";
import { useState } from "react";
import api from "./services/apis";

export default function CreateCard({
  id,
  name = "",
  type = "creature",
  region = "humans",
  tier = 0,
  description = "",
  strength = 0,
  health = 0,
  published = false,
}) {
  const [newName, setName] = useState(name);
  const [newType, setType] = useState(type);
  const [newRegion, setRegion] = useState(region);
  const [newTier, setTier] = useState(tier);
  const [newDescription, setDescription] = useState(description);
  const [newStrength, setStrength] = useState(strength);
  const [newHealth, setHealth] = useState(health);

  async function submitCard() {
    const body = {
      name: newName,
      type: newType,
      region: newRegion,
      tier: parseInt(newTier),
      description: newDescription,
      strength: parseInt(newStrength),
      health: parseInt(newHealth),
      published: published,
    };
    try {
      const res = await api.post("/cards/create", body);
      console.log(res.data);
      alert("card submitted");
      window.location.reload(false);
    } catch (error) {
      alert("not authorized, please log in first");
    }
    return;
  }

  async function publishCard() {
    const body = {
      name: newName,
      type: newType,
      region: newRegion,
      tier: parseInt(newTier),
      description: newDescription,
      strength: parseInt(newStrength),
      health: parseInt(newHealth),
      published: published,
    };
    try {
      const res = await api.put(`/cards/${id}`, body);
      console.log(res.data);
      alert("card published");
      window.location.reload(false);
    } catch (error) {
      alert("not authorized, please log in first");
    }
    return;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="card">
        <header className="cardHeader">
          <input
            type="text"
            placeholder="card name"
            className="w-56 text-center mt-1"
            value={newName}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </header>
        <main className="h-56 flex flex-col justify-center items-center">
          <select
            className="w-28 text-center"
            value={newRegion}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value={"humans"}>humans</option>
            <option value={"elfs"}>elfs</option>
            <option value={"dwarves"}>dwarves</option>
            <option value={"deamons"}>deamons</option>
          </select>
          <textarea
            placeholder="card description"
            rows="6"
            cols="28"
            className="m-2 text-center"
            value={newDescription}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            className="w-28 text-center"
            value={newTier}
            onChange={(e) => setTier(e.target.value)}
          >
            <option value={0}>basic</option>
            <option value={1}>tier 1</option>
            <option value={2}>tier 2</option>
            <option value={3}>tier 3</option>
          </select>
        </main>
        <footer className="cardFooter">
          {newType === "creature" && (
            <div className="flex items-center m-1">
              <input
                type="number"
                className="chooseNumber"
                value={newStrength}
                onChange={(e) => setStrength(e.target.value)}
              ></input>
              <GiBroadsword className="text-3xl" />
            </div>
          )}
          <select
            className="w-28 text-center"
            value={newType}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={"creature"}>creature</option>
            <option value={"spell"}>spell</option>
            <option value={"relic"}>relic</option>
          </select>
          {newType === "creature" && (
            <div className="flex items-center m-1">
              <input
                type="number"
                className="chooseNumber"
                value={newHealth}
                onChange={(e) => setHealth(e.target.value)}
              ></input>
              <BsShieldShaded className="text-3xl" />
            </div>
          )}
        </footer>
      </div>
      <button className="submit" onClick={published ? publishCard : submitCard}>
        {published ? "publish" : "submit"}
      </button>
    </div>
  );
}
