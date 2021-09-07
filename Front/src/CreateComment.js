import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import "./CreateComment.css";

function CreateComment() {
  const token = useSelector((s) => s.user?.token);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();

    if (res.ok) {
      history.go(0);
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div className="App-createcomment-data" align="center">
      <form className="comentario" onSubmit={handleSubmit}>
        <label>
          <input
            className="createtitle"
            placeholder="Escribe tu comentario..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <div className="App-createcomment-actions">
          <button className="action-button">Publica</button>
        </div>
      </form>
    </div>
  );
}

export default CreateComment;

//Crear comentario, link desde una historia
