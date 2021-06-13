import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";

function Changepassword() {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const token = useSelector((s) => s.user?.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://localhost:4000/api/users/change-password",
      {
        method: "POST",
        body: JSON.stringify({ password, newpassword }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "CHANGEPASSWORD", user: data });
    }
  };
  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <label>
        Password:
        <input
          placeholder="Introduce tu contraseña actual..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        New password:
        <input
          placeholder="Introduce tu nueva contraseña..."
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button>Cambiar contraseña</button>
    </form>
  );
}

export default Changepassword;
