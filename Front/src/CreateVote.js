import { Link } from "react-router-dom";
import "./CreateVote.css";

function CreateVote({ votes, userVoted, addVote, removeVote, allVotes }) {
  const lastVotes = allVotes.slice(0, 10);

  const voters = lastVotes.map((v, index, all) => (
    <>
      <Link key={v.id} to={`/userinfo/${v.user_id}`}>
        {v.name}
      </Link>
      {index < all.length - 1 ? "," : null}
    </>
  ));

  return (
    <div className="votes">
      <p>
        {userVoted ? (
          <button className="heart full" onClick={() => removeVote()}>
            Quitar voto
          </button>
        ) : (
          <button className="heart empty" onClick={() => addVote()}>
            Votar
          </button>
        )}
      </p>
      <p className="total">{votes}</p>
      <p className="voters">{voters} ...</p>
    </div>
  );
}

export default CreateVote;
