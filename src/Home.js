import Helmet from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";

function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <Helmet>
        <title>Goodvibing - Home</title>
      </Helmet>
      Welcome to Goodvibing App
      <div className="bottom">
        <NavLink to="/loginregister">¡Bienvenido!</NavLink>
      </div>
      <div className="bottom">
        <Link to="/contact"> Conócenos.¿Hablamos?</Link>
      </div>
      <Search />
    </div>
  );
}

export default Home;
