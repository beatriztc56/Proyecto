import React from "react";
import StoriesHome from "./StoriesHome";
import "./App.css";

export default function Home() {
  return (
    <div className="defaultHome">
      <h1> Bienvenido a </h1>
      <h2>Goodvibing</h2>
      <h1>La plataforma donde podrás compartir</h1>
      <h3>
        <strong>
          <u>SOLO</u> <u>BUENAS</u> <u>NOTICIAS</u>
        </strong>
      </h3>
      <StoriesHome />;
    </div>
  );
}
