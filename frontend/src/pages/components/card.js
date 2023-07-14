import { GiBroadsword } from "react-icons/gi";
import { BsShieldShaded } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import api from "../services/apis";

export default function Card({
  id,
  name,
  type,
  region,
  tier,
  description,
  strength,
  health,
}) {
  const color = ["green", "blue", "purple", "red"];
  async function deleteCard(){
    try {      
    const res = await api.delete(`/cards/${id}`)
      console.log(res.data)
      alert('card deleted')
      window.location.reload(false)
    } catch (error) {
      alert('you are not an admin')
    }

  }
  return (
    <div className={`card ${color[tier]}`}>
      <header className="cardHeader">
        <div className="mt-2 capitalize text-2xl">{name}</div>
        <div className="delContainer">
          <TiDelete 
          className="delete"
          onClick={deleteCard}
          />
          </div>
      </header>
      <main className="cardMain">        
        <div className="description">{description}</div>
        <div className="region">{region}</div>
      </main>
      <footer className="cardFooter">
        {type === 'creature'?(<><div className="flex items-center m-1">
          <b className="text-4xl">{strength}</b>
          <GiBroadsword className="text-3xl" />
        </div>
        <div className="flex items-center m-1">
          <b className="text-4xl">{health}</b>
          <BsShieldShaded className="text-3xl" />
        </div></>):<div className="type">{type}</div>}
      </footer>
    </div>
  );
}
