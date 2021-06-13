import { useState } from "react";

function Contact() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, message);
  };

  return (
    <form className="contact" onSubmit={handleSubmit}>
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
        Message:
        <input
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button>Enviar</button>
    </form>
  );
}

export default Contact;
