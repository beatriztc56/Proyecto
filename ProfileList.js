//Modal desplegable
import { useState } from "react";
import LoginModal from "./LoginModal";
import "./Navbar.css";
import { useUser } from "./UserContext";

function Navbar() {
  const user = useUser();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="content">
          <div className="user-area">
            {!user && (
              <button onClick={() => setShowModal(true)}>Iniciar sesión</button>
            )}
            {user && (
              <>
                <div
                  className="avatar"
                  style={{ backgroundImage: `url(${user.avatar})` }}
                />
                <span>{user.username}</span>
              </>
            )}
          </div>
        </div>
      </header>
      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default Navbar;
