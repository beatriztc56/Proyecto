import { useState } from "react";

function CreateStory() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, date, story, authorName);
  };

  return (
    <form className="Título" onSubmit={handleSubmit}>
      <label>
        Título:
        <input
          placeholder="Escribe el título de tu historia..."
          value={text}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Fecha:
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
      </label>
      <br />
      <label>
        Usuario:
        <input
          value={user}
          onChange={(e) => setAuthorName(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Historia:
        <input
          placeholder="Cuéntanos tu experiencia..."
          value={text}
          onChange={(e) => setStory(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button>Publica</button>
    </form>
  );
}

export default CreateStory;

// Petición de crear historia
//FOTOS
//MAPA (otro componente)
