import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./services/apis";

export default function Layout() {
  const [user, setUser] = useState(false);
  
  useEffect(() => {
  console.log(localStorage.getItem("user"));
  if (localStorage.getItem("user") !== "none") {
    console.log("logged");
    setUser(true);
  }else setUser(false)
   }, []);
  async function logout() {
    try {
      const result = await api.post("/users/logout");
      if (result.status === 200) {
        localStorage.setItem("user", "none");
        setUser(false);
      } else alert("logout error");
    } catch (error) {
      alert("logout error");
    }
    return;
  }
  return (
    <>
      <nav className="h-20 flex justify-between">
        <ul className="flex">
          <li className="m-3" key={1}>
            <Link className="menu" to="/">
              Home
            </Link>
          </li>
          {user && (
            <>
              <li className="m-3" key={2}>
                <Link className="menu" to="/create">
                  Create a card
                </Link>
              </li>
              <li className="m-3" key={3}>
                <Link className="menu" to="/cards">
                  Cards
                </Link>
              </li>
              <li className="m-3" key={4}>
                <Link className="menu" to="/staging-area">
                  Staging area
                </Link>
              </li>
            </>
          )}
          {!user && (
            <li className="m-3" key={5}>
              <Link className="menu" to="/login-register">
                Login/register
              </Link>
            </li>
          )}          
        </ul>
        {user && (
            <div className="m-3" key={6}>
              <button className="px-2 h-8" onClick={() => logout()}>
                LOG OUT
              </button>
            </div>
          )}
      </nav>
      <Outlet />
    </>
  );
}
