import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import "./Userinfo.css";

function Userinfo() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", message: error.message });
      }
    };

    loadUser();
  }, [token, setUser, dispatch, id]);

  if (!user) return <p></p>;

  return (
    <div className="userinfo">
      <h3>{user.name}</h3>
      <p />
      <p align="center">{user.bio}</p>
      <p align="center">{user.residence}</p>
      <p align="center">{new Date(user.birthdate).toLocaleDateString()}</p>
      <p align="center">{user.email}</p>
      <p />
      <div className="App-userinfo-actions">
        <Link
          className="action-button"
          type="submit"
          to={`/viewstoriesuser/${user.id}`}
        >
          Ver historias del usuario
        </Link>
      </div>
    </div>
  );
}

<Footer />;

export default Userinfo;
