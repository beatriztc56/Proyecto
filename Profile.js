import { useState } from "react";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [biography, setBiography] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [residence, setResidence] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      username,
      email,
      password,
      avatar,
      biography,
      birthdate,
      residence
    );
  };

  const isLoggedIn = useSelector((s) => !!s.user);

  if (!isLoggedIn) return <Redirect to="/login" />;

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
      <label>
        <div
          className="avatar"
          style={preview && { backgroundImage: `url(${preview})` }}
        />
        <input onChange={handleFile} type="file" />
      </label>
      <br />
      <label>
        Biografía:
        <input
          placeholder="Escribe algo sobre ti..."
          value={text}
          onChange={(e) => setBiography(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Fecha de nacimiento:
        <input
          placeholder="00/00/0000..."
          value={date}
          onChange={(e) => setBirthdate(e.target.value)}
          type="date"
        />
      </label>
      <br />
      <label>
        Residencia:
        <input
          placeholder="¿Dónde vives?"
          value={text}
          onChange={(e) => setResidence(e.target.value)}
          type="text"
        />
      </label>

      <button>Guardar cambios</button>
    </form>
  );
}

export default Profile;
