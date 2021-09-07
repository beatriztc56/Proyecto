import UseFetchToken from "./useFetchToken";
import { useSelector } from "react-redux";

import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function StoryUserEdit() {
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();

  const [story] = UseFetchToken(`http://localhost:4000/api/stories/${id}`);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(20),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  }));

  const classes = useStyles();

  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Mi historia">
      <CssBaseline />
      <div className={classes.paper}>
        <h3>{story.title}</h3>
        <p className="date">{new Date(story.date).toLocaleDateString()}</p>
        <p />
        <Link className="myname" href="/userinfo" color="primary">
          {user.name}{" "}
        </Link>
        <p />
        <Container
          maxWidth="xs"
          style={{ margin: 40 }}
          align="center"
          className="body"
        >
          {story.body}
        </Container>
      </div>
    </div>
  );
}

export default StoryUserEdit;
