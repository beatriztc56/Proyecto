import UseFetch from "./UseFetch";
import StoryTitle from "./StoryTitle";
import "./RandomStories.css";

function RandomStories({ q }) {
  const stories = UseFetch(`http://localhost:4000/api/random-stories`);

  if (!stories) return <p>Cargando...</p>;

  return (
    <div>
      <h3 className="explorerandom">Explora historias aleatorias</h3>
      <div className="randomstories">
        {stories.data.map((s) => (
          <div className="cajas" key={s.id}>
            <StoryTitle href={`/story/${s.id}`}>{s.title}</StoryTitle>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomStories;
