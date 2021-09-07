import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";

function MyComments() {
  const { user } = useSelector((state) => state.user);
  const [results] = UseFetchToken(`http://localhost:4000/api/users/${user.id}`);

  if (!results) return <p>Cargando...</p>;

  return (
    <div className="Mis comentarios">
      <h1>Tus comentarios</h1>
      {results.map((e) => (
        <li key={e.id}>
          <p>{e.text}</p>
        </li>
      ))}

      {!results.length && <i>No se han encontrado comentarios</i>}
    </div>
  );
}

export default MyComments;

//Ver mis comentarios
