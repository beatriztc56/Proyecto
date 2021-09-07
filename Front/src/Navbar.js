import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
import "./Navbar.css";
import logo from "./assets/img/logo.jpg";
import dados from "./assets/img/dados.png";
import login from "./assets/img/login.png";
import register from "./assets/img/register.png";
import iconoSobre from "./assets/img/iconoSobre.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: "50%",
    color: "white",
    height: "50px",
    padding: "0 10px",
    marginTop: "15px",
    width: "20%",
    type: "submit",
  },
});

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(null);
  const history = useHistory();
  const classes = useStyle();
  return (
    <div className="">
      <div className="flex-container">
        <div className="buttonLogoHome">
          <Link to="/">
            <img src={logo} width={250} href="/" alt="home" />
          </Link>
        </div>
        <div className="flexsearch">
          <div className="flexsearch--wrapper">
            <div className="flexsearch--form">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (search) {
                    history.push(`/search?q=${search}`);
                  }
                }}
              >
                <div className="flexsearch--input-wrapper navbar-search">
                  <input
                    className="flexsearch--input"
                    placeholder="Busca una experiencia"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  ></input>
                  <button className="action-button" type="submit">
                    ⇨
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="random">
          <Link to="/RandomStories">
            <img src={dados} width={150} alt="random" />
          </Link>
        </div>

        {!user ? (
          <>
            <div className="login">
              <Link to="./Login">
                <img src={login} width={100} href="./Login" alt="login" />
              </Link>
            </div>
            <div className="register">
              <Link to="./Register">
                <img
                  src={register}
                  width={100}
                  href="./Register"
                  alt="registro"
                />
              </Link>
            </div>
          </>
        ) : (
          <>
            <UserAvatar src={user.user.avatar} />
          </>
        )}
      </div>

      <div className="btn-flotante">
        <Link to="/contact">
          <img src={iconoSobre} width={50} alt="contact" />
        </Link>
      </div>
    </div>
  );
}
