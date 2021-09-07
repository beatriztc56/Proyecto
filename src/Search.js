import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import RandomStories from "./RandomStories";

function Search() {
  const { q } = useParams();
  const history = useHistory();
  const [search, setSearch] = useState(q || ""); //Se pone q como valor inicial, para cuando se busque el nombre en el formulario y si no hay q, cadena vacía
  const dispatch = useDispatch(); //Así q se puede editar
  const recent = useSelector((s) => s.history);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/search/" + search); //Al pulsar submit, con push, cambiará de ruta
    dispatch({ type: "SEARCH", search });
  };

  return (
    <div className="search">
      <h1>Explora historias</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </form>
      {q && <RandomStories q={q} />}
      {!q && recent.length > 0 && (
        <div className="history">
          <h2>Historias</h2>
          <ul>
            {recent.map((s) => (
              <li key={s}>
                <Link to={`/search/${s}`}>{s}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
//Línea 34 : si hay q, entonces enseñamé los resultados de q, llamando al componente SearchResults (así solo hace fetch cuando ponemos un nombre, y no siempre)
//Línea 32: formulario con botón de búsqueda

//Al buscar vamos a la página de explora, donde aparece un listado con previsualizaciones de las historias, buscando por palabra clave
