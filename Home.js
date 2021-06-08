import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <aside className="home">
      <div className="top">
        <NavLink to="/home" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink to="/search" activeClassName="active" exact>
          Search
        </NavLink>
        <NavLink to="/registrologin" activeClassName="active" exact>
          Registrologin
        </NavLink>
        <NavLink to="/contact" activeClassName="active" exact>
          Contact
        </NavLink>
      </div>
      <div className="bottom">
        {!user && <Link to="/registrologin">Log in</Link>}
        {user && (
          <Link className="user-info" to="/home">
            <div
              className="avatar"
              style={{ backgroundImage: `url(${user.avatar})` }}
            />
            <span>{user.username}</span>
            <span className="logout" onClick={handleLogout}>
              ⏻
            </span>
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Home;
