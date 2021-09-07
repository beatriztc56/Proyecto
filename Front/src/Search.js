import { useLocation } from "react-router-dom";
import RandomStories from "./RandomStories";
import useFetch from "./UseFetch";
import StoryTitle from "./StoryTitle";
import "./Search.css";

function Search({ q }) {
  const stories = useFetch(`http://localhost:4000/api/stories?q=${q}`);

  if (!stories) return <p>Cargando...</p>;

  return (
    <div className="search">
      {stories.data.length > 0 ? (
        <div className="history">
          <h3 className="searchresults">Resultados</h3>
          <ul>
            {stories.data.map((s) => (
              <div key={s.id}>
                <StoryTitle href={`/story/${s.id}`}>{s.title}</StoryTitle>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay resultados...</p>
      )}
    </div>
  );
}

function SearchWrapper() {
  const q = new URLSearchParams(useLocation().search).get("q");

  if (!q) return <RandomStories />;

  return <Search q={q} />;
}

export default SearchWrapper;

//Al buscar vamos a la página de explora, donde aparece un listado con previsualizaciones de las historias, buscando por palabra clave
