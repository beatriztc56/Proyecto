import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "./UserAvatar";

function UploadAvatar() {
  const [file, setFile] = useState();
  const { token, user } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      if (!file) {
        throw new Error("No hay ningún fichero que subir");
      }

      console.log(file);

      e.preventDefault();
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await fetch("http://localhost:4000/api/users/avatar", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      });
      const { data } = await res.json();
      dispatch({ type: "EDIT", user: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", message: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <img
        className="avatar"
        src={`http://localhost:4000/images/${user.avatar}`}
        alt={user.name}
      />
      <p className="center">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      </p>
      <p className="center">
        <button className="action-button" type="submit">
          Enviar
        </button>
      </p>
    </form>
  );
}

export default UploadAvatar;
