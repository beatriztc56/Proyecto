import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./GetComments.css";

const useStyle = makeStyles({
  submit: {
    background: "#84047e",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 50,
    padding: "0 30px",
    marginTop: "15px",
    marginLeft: "10px",
    width: "50%",
    type: "submit",
  },
});

function GetComments({ comments, storyUserId }) {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyle();
  const deleteComment = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`http://localhost:4000/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();

      if (res.ok) {
        history.go(0);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", message: error.message });
    }
  };

  return (
    <>
      <div className="createcomment">
        {comments.map((e) => (
          <div className="list" align="center" key={e.id}>
            {e.text}
            <div className="date">{new Date(e.date).toLocaleDateString()}</div>
            <Link to={`/userinfo/${e.user_id}`}>{e.username}</Link>
            {user.id === e.user_id || user.id === storyUserId ? (
              <div>
                <Button
                  className={classes.submit}
                  onClick={(event) => {
                    event.preventDefault();
                    deleteComment(e.id);
                  }}
                >
                  Borrar comentario
                </Button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

export default GetComments;
