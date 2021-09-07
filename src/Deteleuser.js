import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function DeleteUser() {
  const token = useSelector((s) => s.user?.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://localhost:4000/api/users/delete", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "DELETE", user: data });
    }
  };
  if (!token) {
    return <Redirect to="/loginregister" />;
  }

  return (
    <div className="deleteuser" onSubmit={handleSubmit}>
      <button>Eliminar cuenta</button>
    </div>
  );
}

export default DeleteUser;
