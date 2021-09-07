import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
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
});

function DeleteComment() {
  const token = useSelector((s) => s.user?.token);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyle();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de eliminar tu comentario?")) {
      const res = await fetch(`https://localhost:4000/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      if (res.ok) {
        history.push("/getcomments");
      } else {
        dispatch({ type: "SET_ERROR", message: data.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button className={classes.submit} type="submit">
        Borrar comentario
      </Button>
    </form>
  );
}

export default DeleteComment;
