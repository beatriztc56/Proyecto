import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./UseFetch";
import "./StoriesHome.css";

function StoriesHome() {
  const results = useFetch(`http://localhost:4000/api/storieshome`);

  if (!results) return <p>Cargando...</p>;

  return (
    <aside className="storieshome">
      {results.data.map((e) => (
        <div className="cajas" key={e.id}>
          <div className="titulo">
            <Link className="title" to={`/story/${e.id}`}>
              {e.title}
            </Link>
          </div>
          <p className="body">{e.body}</p>
        </div>
      ))}
      {!results.data.length && <i>No se han encontrado historias</i>}
    </aside>
  );
}

export default StoriesHome;
