const { database } = require("../infrastructure");

async function findCommentsById({ id }) {
  const query = "SELECT * FROM comments WHERE id = ?";
  const [comments] = await database.pool.query(query, [id]);

  return comments[0];
}

async function getStoryComments({ story_id }) {
  const query = `
    SELECT * 
    FROM comments
    WHERE story_id = ?
  `;

  const [comments] = await database.pool.query(query, [story_id]);

  return comments;
}

async function createComments({ user_id, story_id, text }) {
  const query =
    "INSERT INTO comments (user_id, story_id, text, date) VALUES (?, ?, ?, ?)";

  const [result] = await database.pool.query(query, [
    user_id,
    story_id,
    text,
    new Date(),
  ]);

  return findCommentsById({ id: result.insertId });
}

async function deleteComments({ id }) {
  const query = "DELETE FROM comments WHERE id = ?";

  await database.pool.query(query, [id]);

  return;
}

async function getUserComments({ id }) {
  const query = `
    SELECT *
    FROM comments
    WHERE user_id = ?
  `;

  const [result] = await database.pool.query(query, [id]);

  return result;
}

module.exports = {
  findCommentsById,
  createComments,
  deleteComments,
  getStoryComments,
  getUserComments,
};
