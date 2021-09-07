import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./Register.css";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "30%",
    type: "submit",
  },
});

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyle();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "REGISTER", user: data.data });
      history.push("/");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  return (
    <div className="register">
      <div className="registertitle">
        <h3>Regístrate</h3>
      </div>
      <form className="signup" align="center" onSubmit={handleSubmit}>
        <label>
          <input
            className="name"
            name="Name"
            required
            placeholder="Nombre"
            fullWidth
            id="Name"
            label="Nombre"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p />
        <label>
          <input
            className="mail"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </label>
        <p />
        <label>
          <input
            className="password"
            required
            fullWidth
            name="password"
            label="Contraseña"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <p />
        <Button className={classes.submit} type="submit">
          Únete a nuestra comunidad
        </Button>
      </form>
    </div>
  );
}

export default Register;
