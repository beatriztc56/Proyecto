import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import UploadImage from "./UploadImage";
import "./CreateStory.css";

function CreateStory() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const token = useSelector((s) => s.user.token);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/stories", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (res.ok) {
      if (image) {
        const id = data.data.id;
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

      history.push("/mystories");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div className="App-createstory-data" align="center">
      <h3 className="blog">¡Bienvenid@ a tu blog!</h3>
      <div className="preview">
        <h3>{title}</h3>
        <p>{body}</p>

        {image && <img src={URL.createObjectURL(image)} alt={title} />}
      </div>
      <form className="create" onSubmit={handleSubmit}>
        <label>
          <input
            className="createtitle"
            align="center"
            placeholder="Escribe aquí el título..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <input
            className="createbody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escribe aquí tu historia..."
          />
        </label>

        <label>
          <label>
            <p className="textimage">Imagen:</p>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          </label>
        </label>

        <div className="App-createstory-actions">
          <button className="action-button">Publica</button>
        </div>
      </form>
    </div>
  );
}

export default CreateStory;
