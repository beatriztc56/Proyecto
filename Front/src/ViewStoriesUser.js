import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./Userinfo.css";

function ViewStoriesUser() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [stories, setStories] = useState();
  const { id } = useParams();

  useEffect(() => {
    const storiesUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/users/${id}/stories`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setStories(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", message: error.message });
      }
    };

    storiesUser();
  }, [token, setStories, dispatch, id]);

  if (!stories) return <p></p>;

  return (
    <div className="viewstories">
      <h3 className="listahistorias">Historias</h3>
      {stories.map((e) => (
        <div className="historias" key={e.id}>
          <Link to={`/mystory/${e.id}`}>{e.title}</Link>

          <p>{e.body}</p>
        </div>
      ))}
      {!stories.length && <i>No se han encontrado historias</i>}
    </div>
  );
}

export default ViewStoriesUser;
