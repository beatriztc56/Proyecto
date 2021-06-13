import { NavLink } from "react-router-dom";
import useFetchToken from "./useFetchToken";
import { Link } from "react-router-dom";

function MyStories({ id }) {
  const results = useFetchToken(`https://localhost:4000/api/users/${id}`);
  return (
    <div className="Mis historias">
      <h1>Tus historias</h1>
      {results?.results?.map((e) => (
        <li key={e.id}>
          <Link to={`/mystories/${e.id}`}>{e.name}</Link>
        </li>
      ))}
      {!results && <i>Loading...</i>}
      {results && !results.results && <i>No se han encontrado historias</i>}

      <div className="bottom">
        <NavLink to="/createstory">Crea tu historia</NavLink>
      </div>
    </div>
  );
}

export default MyStories;
