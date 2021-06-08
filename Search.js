import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Helmet from "react-helmet";
import SearchResults from "./SearchResults";

function Search() {
  const { q } = useParams();
  const history = useHistory();
  const [search, setSearch] = useState(q || "");
  const dispatch = useDispatch();
  const recent = useSelector((s) => s.history);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/search/" + search);
    dispatch({ type: "SEARCH", search });
  };

  return (
    <div className="search">
      <h1>Character search</h1>
      <Helmet>
        <title>Rick&amp;Morty - {q ? "Search: " + q : "Search"}</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </form>
      {q && <SearchResults q={q} />}
      {!q && recent.length > 0 && (
        <div className="history">
          <h2>Recent searches:</h2>
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
