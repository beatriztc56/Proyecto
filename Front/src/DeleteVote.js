import { useSelector } from "react-redux";

function DeleteVote({ story_id }) {
  const token = useSelector((s) => s.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/stories/${story_id}/vote`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      await res.json();
    }
  };

  return <div className="deletevote" onSubmit={handleSubmit}></div>;
}

export default DeleteVote;
