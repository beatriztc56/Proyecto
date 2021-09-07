import { Link, useParams } from "react-router-dom";
import UseFetchToken from "./useFetchToken";
import CreateComment from "./CreateComment";
import React from "react";
import GetComments from "./GetComments";
import "./MyStory.css";

function MyStory() {
  const { id } = useParams();
  const [story] = UseFetchToken(`http://localhost:4000/api/stories/${id}`);
  if (!story) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Mihistoria">
      <h3 className="mihistoria">{story.title}</h3>
      <p align="center " className="date">
        {new Date(story.date).toLocaleDateString()}
      </p>
      <div className="myname" align="center">
        <Link to={`/userinfo/${story.user_id}`}>{story.user_name}</Link>
      </div>
      {story.image && (
        <img
          src={`http://localhost:4000/images/${story.image}`}
          alt={story.title}
        />
      )}
      <div className="story">{story.body}</div>

      <div className="comment">
        <CreateComment />
        <p />

        <div className="comments">
          <GetComments storyUserId={story.user_id} comments={story.comments} />
        </div>
      </div>

      <div className="App-mystory-actions">
        <div className="editstory">
          <Link className="action-button" type="submit" to={`/editstory/${id}`}>
            Editar historia
          </Link>
        </div>

        <div className="deletestory">
          <Link
            className="action-button"
            type="submit"
            to={`/deletestory/${id}`}
          >
            Eliminar historia
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyStory;
