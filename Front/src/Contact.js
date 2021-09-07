import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./Contact.css";

const useStyles = makeStyles((theme) => ({
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
}));

export default function Contact() {
  const classes = useStyles();

  return (
    <div className="contact">
      <div className="contacttitle">
        <h3>Escríbenos</h3>
      </div>
      <form className="contactform" align="center">
        <label>
          <input
            className="mail"
            required
            fullWidth
            placeholder="Correo electrónico"
            id="email"
            label="Correo electrónico"
            name="email"
            type="email"
          />
        </label>
        <p />
        <label>
          <input className="message" placeholder="Escribe aquí tu mensaje" />
        </label>
        <p />

        <Button className={classes.submit} type="submit">
          ¡Envía!
        </Button>
      </form>
    </div>
  );
}
