import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import StoryUserEdit from "./StoryUserEdit";
import UploadImage from "./UploadImage";
import "./EditStory.css";

function EditStory({ story }) {
  const [body, setBody] = useState();
  const [title, settitle] = useState();
  const [date, setDate] = useState();

  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${id}`,

      {
        method: "PUT",
        body: JSON.stringify({ title, body, date }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();

    if (res.ok) {
      if (image) {
        const payload = new FormData();
        payload.append("image", image);

        await fetch(`http://localhost:4000/api/stories/${id}/image`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: payload,
        });
      }

      history.push(`/mystory/${id}`);
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div className="App-editstory-data" align="center">
      <div className="historia">
        <StoryUserEdit />
      </div>
      <form className="mystory" onSubmit={handleSubmit}>
        <p>
          <label>
            <input
              className="createtitle"
              placeholder="Escribe un título..."
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              className="createbody"
              placeholder="Escribe tu historia..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </label>
        </p>
        <p>
          <label>
            <p className="textimage">Imagen:</p>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          </label>
        </p>
        <div className="App-editstory-actions">
          <button className="action-button" type="submit">
            Publica
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStory;

//La fecha se debe poner automática, da error
//Hace falta poner el valor inicial en useState
