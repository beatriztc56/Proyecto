import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./MyStories.css";

function MyStories() {
  const { user } = useSelector((state) => state.user);
  const [results] = UseFetchToken(
    `http://localhost:4000/api/users/${user.id}/stories`
  );

  console.log(results);

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="mystories">
      <h3>Tus historias</h3>

      {results.map((e) => (
        <div className="historias" key={e.id}>
          <Link className="title" to={`/mystory/${e.id}`}>
            {e.title}
          </Link>

          <p className="body">{e.body}</p>
        </div>
      ))}

      {!results.length && <i>No se han encontrado historias</i>}

      <div className="App-mystories-actions">
        <Link className="action-button" to="./createstory">
          Crea tu historia
        </Link>
      </div>
    </div>
  );
}

export default MyStories;
