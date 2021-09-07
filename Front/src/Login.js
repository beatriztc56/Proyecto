import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 4,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "15px",
    width: "30%",
    type: "submit",
  },
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useSelector((s) => !!s.user);
  const dispatch = useDispatch();
  const classes = useStyle();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: "LOGIN", user: data.data });
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div className="logintitle">
        <h3>Loguéate</h3>
      </div>
      <form className="signin" align="center" onSubmit={handleSubmit}>
        <label>
          <input
            className="mail"
            required
            fullWidth
            placeholder="Correo electrónico"
            id="email"
            label="Correo electrónico"
            name="email"
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
            id="password"
            placeholder="Contraseña"
            label="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <p />
        <Button className={classes.submit} type="submit">
          ¡Entra!
        </Button>
      </form>
    </div>
  );
}

export default Login;
