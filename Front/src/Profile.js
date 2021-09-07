import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import "./profile.css";
import UploadAvatar from "./UploadAvatar";
import { Link } from "react-router-dom";

function Profile() {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [birthdate, setBirthdate] = useState(user.birthdate || "");
  const [residence, setResidence] = useState(user.residence || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users", {
      method: "PUT",
      body: JSON.stringify({
        name,
        email,
        bio,
        residence,
        birthdate,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "EDIT", user: data.data });
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  console.log(birthdate);

  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <div classname="container-profile App-profile">
      {/*         
        <div className="info">
          <Userinfo user={user} />
        </div> 
        */}

      <div className="App-profile-data">
        <div className="profile-form">
          <h3>Editar datos</h3>
          <form className="profile" onSubmit={handleSubmit}>
            <p>
              <label>
                <input
                  align="center"
                  placeholder="User..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </p>
            <p>
              <label>
                <input
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </label>
            </p>
            <p>
              <label>
                <input
                  placeholder="Escribe algo sobre ti..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  type="text"
                />
              </label>
            </p>
            <p>
              <label>
                <input
                  value={
                    birthdate && birthdate.length > 10
                      ? birthdate.slice(0, 10)
                      : birthdate
                  }
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                  }}
                  type="date"
                />
              </label>
            </p>
            <p>
              <label>
                <input
                  placeholder="¿Dónde vives?"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                  type="text"
                />
              </label>
            </p>
            <p className="center">
              <button className="action-button" type="submit">
                Guardar cambios
              </button>
            </p>
          </form>
        </div>

        <div className="avatar-form">
          <h3>Cambiar avatar</h3>
          <UploadAvatar />
        </div>
      </div>

      <div className="App-profile-actions">
        <Link className="action-button" to="/deleteuser">
          Eliminar cuenta
        </Link>

        <Link className="action-button" to="/changepassword">
          Cambiar contraseña
        </Link>
      </div>
    </div>
  );
}

export default Profile;
