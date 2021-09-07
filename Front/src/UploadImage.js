import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ImageStory from "./ImageStory";
import "./UploadImage.css";

function UploadImage() {
  const [file, setFile] = useState();
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    try {
      if (!file) {
        throw new Error("No hay ningún fichero que subir");
      }

      console.log(file);

      e.preventDefault();
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`http://localhost:4000/api/stories/${id}/image`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      });
      const { data } = await res.json();
      console.log("data", data);

      if (res.ok) {
        file(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", message: error.message });
    }
  };

  return (
    <div className="UploadImage">
      <ImageStory />
      <form onSubmit={handleSubmit}>
        <label>
          <p className="textimage">Imagen:</p>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" />
        </label>
        <p className="buttonEnviar">
          <Link className="action-button" to="./uploadimage">
            Enviar
          </Link>
        </p>
      </form>
    </div>
  );
}

export default UploadImage;
