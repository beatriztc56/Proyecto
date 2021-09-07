import { Link, Redirect, useParams } from "react-router-dom";
import useFetchToken from "./useFetchToken";
import { useDispatch } from "react-redux";
import CreateComment from "./CreateComment";
import GetComments from "./GetComments";
import CreateVote from "./CreateVote";
import "./ViewStory.css";
import { useSelector } from "react-redux";

function ViewStory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((s) => s.user?.token);

  const [story, error, setStory] = useFetchToken(
    `http://localhost:4000/api/stories/${id}`
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const addVote = async function () {
    const res = await fetch(`http://localhost:4000/api/stories/${id}/vote`, {
      method: "POST",
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: "SET_ERROR", message: data.message });
    } else {
      setStory({
        ...story,
        userVoted: true,
        votes: story.votes + 1,
        allVotes: data.data,
      });
    }
  };

  const removeVote = async function () {
    const res = await fetch(`http://localhost:4000/api/stories/${id}/vote`, {
      method: "DELETE",
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      dispatch({ type: "SET_ERROR", message: data.message });
    } else {
      setStory({
        ...story,
        userVoted: false,
        votes: story.votes - 1,
        allVotes: data.data,
      });
    }
  };

  if (error) {
    dispatch({ type: "SET_ERROR", message: error });
    return <Redirect to="/" />;
  }

  if (!story) {
    return <div>Loading...</div>;
  }

  console.log(story);

  return (
    <aside>
      <h3 className="verhistoria">{story.title}</h3>

      <p className="date">{new Date(story.date).toLocaleDateString()}</p>
      <div className="author">
        <Link to={`/userinfo/${story.user_id}`}>{story.user_name} </Link>
      </div>
      <div className="story">
        <p>{story.body}</p>
      </div>
      <div className="comment">
        <div>
          <CreateComment />
        </div>
        <div className="Comments">
          <GetComments storyUserId={story.user_id} comments={story.comments} />
        </div>
      </div>
      <p />
      <div className="votos">
        <CreateVote
          votes={story.votes}
          userVoted={story.userVoted}
          addVote={addVote}
          removeVote={removeVote}
          allVotes={story.allVotes}
        />
      </div>
    </aside>
  );
}

export default ViewStory;
