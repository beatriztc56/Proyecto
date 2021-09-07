import { useParams } from "react-router-dom";
import UseFetch from "./useFetch";
import { Helmet } from "react-helmet";

function ViewStory() {
  const { id } = useParams();
  const story = UseFetch(`https://localhost:4000/api//api/stories/${id}`);

  if (!story) {
    return <div>Loading...</div>;
  }
  return (
    <div className="story">
      <h1>{story.name}</h1>
      <Helmet>
        <title>Goodvibing app {story && "- " + story.name}</title>
      </Helmet>
      {story}
    </div>
  );
}

export default ViewStory;
