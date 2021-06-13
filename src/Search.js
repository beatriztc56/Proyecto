import { useState } from "react";

function Search() {
  const [search, setSearch] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch([...search]);
  };

  return (
    <div className="search">
      <div className="stories">
        {search.map((story, i) => (
          <div key={i}>{story}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Busca por palabra clave..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;

//Al buscar vamos a la página de explora, donde aparece un listado con previsualizaciones de las historias, buscando por palabra clave
