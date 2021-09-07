const { database } = require("../infrastructure");

async function findCommentsById({ id }) {
  const query = "SELECT * FROM comments WHERE id = ?";
  const [comments] = await database.pool.query(query, [id]);

  return comments[0];
}

async function getStoryComments({ story_id }) {
  const query = `
    SELECT comments.*, users.name AS username
    FROM comments
    LEFT JOIN users ON comments.user_id = users.id
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
  await database.pool.query("DELETE FROM comments WHERE id = ?", id);

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
