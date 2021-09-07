import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeleteUser() {
  const token = useSelector((s) => s.user.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Confirma esta acción... no hay vuelta atrás")) {
      const res = await fetch("http://localhost:4000/api/users/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "LOGOUT" });
        history.push("/");
      } else {
        dispatch({ type: "SET_ERROR", message: data.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>Eliminar cuenta</button>
    </form>
  );
}

export default DeleteUser;
