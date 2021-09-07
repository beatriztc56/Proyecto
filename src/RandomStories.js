import { Link } from "react-router-dom";
import useFetch from "./useFetch";

function RandomStories({ q }) {
  const stories = useFetch(`https://localhost:4000/api/stories?name=${q}`);
  return (
    <div className="randomstories">
      <h1>historias</h1>
      <div>
        {stories?.stories?.map((e) => (
          <li key={e.id}>
            <Link to={`/randomstories/${e.id}`}>{e.q}</Link>
          </li>
        ))}
        {!stories && <i>Loading...</i>}
        {stories && !stories.results && <i>No se han encontrado historias</i>}
      </div>
    </div>
  );
}

export default RandomStories;

//Resultado búsqueda de historias en barra de búsqueda de home
//Revisar el link al hacer map
