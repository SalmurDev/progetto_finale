import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="h-20">
        <ul className="flex">
          <li className="m-3" key={1}>
            <Link className="menu" to="/">Home</Link>
          </li>
          <li className="m-3" key={2}>
            <Link className="menu" to="/create">Create a card</Link>
          </li>
          <li className="m-3" key={3}>
            <Link className="menu" to="/cards">Cards</Link>
          </li>
          <li className="m-3" key={4}>
            <Link className="menu" to="/staging-area">Staging area</Link>
          </li>
          <li className="m-3" key={5}>
            <Link className="menu" to="/login-register">Login/register</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
