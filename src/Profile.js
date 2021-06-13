import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biography, setBiography] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [residence, setResidence] = useState("");
  const token = useSelector((s) => s.user?.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://localhost:4000/api/users", {
      method: "PUT",
      body: JSON.stringify({
        username,
        email,
        password,
        biography,
        birthdate,
        residence,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "EDIT", user: data });
    }
  };
  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <form className="edituser" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          placeholder="User..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </label>
      <br />
      <br />
      <label>
        Biografía:
        <input
          placeholder="Escribe algo sobre ti..."
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Fecha de nacimiento:
        <input
          placeholder="00/00/0000..."
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          type="date"
        />
      </label>
      <br />
      <label>
        Residencia:
        <input
          placeholder="¿Dónde vives?"
          value={residence}
          onChange={(e) => setResidence(e.target.value)}
          type="text"
        />
      </label>

      <button>Guardar cambios</button>
      <NavLink to="/changepassword">Cambiar contraseña</NavLink>
      <NavLink to="/deleteuser">Eliminar cuenta</NavLink>
    </form>
  );
}

export default Profile;
