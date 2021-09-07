import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Container, CssBaseline, TextField } from "@material-ui/core";

function Changepassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = useSelector((s) => s.user?.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users/change-password", {
      method: "POST",
      body: JSON.stringify({ password, newPassword }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "CHANGEPASSWORD", user: data.data });
      history.push("/profile");
    } else {
      dispatch({ type: "SET_ERROR", message: data.message });
    }
  };
  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form className="Login" onSubmit={handleSubmit}>
        <label>
          <TextField
            id="filled-basic"
            variant="filled"
            type="password"
            placeholder="Introduce tu contraseña actual..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p />
        <label>
          <TextField
            id="filled-basic"
            type="password"
            variant="filled"
            placeholder="Introduce tu nueva contraseña..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <p />

        <button>Cambiar contraseña</button>
      </form>
    </Container>
  );
}

export default Changepassword;
