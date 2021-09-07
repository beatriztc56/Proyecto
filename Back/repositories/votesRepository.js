const { database } = require("../infrastructure");
const storiesRepository = require("./storiesRepository");

async function createVotes({ user_id, story_id }) {
  const query = "INSERT INTO votes (user_id, story_id) VALUES (?, ?)";
  await database.pool.query(query, [user_id, story_id]);
  return await storiesRepository.findStoriesById({ id: story_id });
}

async function findVote({ user_id, story_id }) {
  const query = "SELECT * FROM votes WHERE user_id = ? AND story_id = ?";
  const [votes] = await database.pool.query(query, [user_id, story_id]);

  return votes;
}

async function getVotes({ story_id }) {
  const query = `
    SELECT votes.*, users.name FROM votes
    LEFT JOIN users ON votes.user_id = users.id
    WHERE votes.story_id=?;
  `;

  const [votes] = await database.pool.query(query, [story_id]);

  return votes;
}

async function deleteVotes({ user_id, story_id }) {
  const query = "DELETE FROM votes WHERE user_id = ? AND story_id = ?";

  await database.pool.query(query, [user_id, story_id]);

  return await storiesRepository.findStoriesById({ id: story_id });
}

module.exports = { createVotes, deleteVotes, findVote, getVotes };
