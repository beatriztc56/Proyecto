const { database } = require("../infrastructure");

async function getStories({ search }) {
  let query;
  if (!search) {
    query = `
      SELECT stories.*, COUNT(votes.id) as votes
      FROM stories
      LEFT JOIN votes ON stories.id = votes.story_id
      GROUP BY stories.id
      `;
  } else {
    query = `
      SELECT stories.*, COUNT(votes.id) as votes
      FROM stories
      LEFT JOIN votes ON stories.id = votes.story_id
      WHERE title LIKE CONCAT('%', ?,  '%')
      OR body LIKE CONCAT('%', ?,  '%')
      GROUP BY stories.id    
      `;
  }
  const [stories] = await database.pool.query(query, [search, search]);

  return stories;
}

async function findStoriesById({ id }) {
  const query = `
    SELECT stories.*, COUNT(votes.id) as votes 
    FROM stories 
    LEFT JOIN votes ON stories.id = votes.story_id
    WHERE stories.id = ?
    GROUP BY stories.id
    `;
  const [stories] = await database.pool.query(query, [id]);

  return stories[0];
}

async function searchStory({ id, tittle, body }) {
  const query = "SELECT * FROM stories WHERE id = ?";
  const [stories] = await database.pool.query(query, [id, tittle, body]);

  return [stories];
}

async function createdStory({ user_id, title, body }) {
  const query = `
    INSERT INTO stories (title, body, user_id, date) 
    VALUES (?, ?, ?, ?)
    `;

  const [result] = await database.pool.query(query, [
    title,
    body,
    user_id,
    new Date(),
  ]);

  return findStoriesById({ id: result.insertId });
}

async function updateStories({ body, title, date, id }) {
  const query = "UPDATE stories SET body = ?, title = ?, date = ? WHERE id = ?";
  await database.pool.query(query, [body, title, new Date(date), id]);

  return findStoriesById({ id });
}

async function deleteStories({ id }) {
  const query = "DELETE FROM stories WHERE id = ?";

  return await database.pool.query(query, [id]);
}

async function getUserStories({ id }) {
  const query = `
    SELECT stories.*, COUNT(votes.id) as votes
    FROM stories
    LEFT JOIN votes ON stories.id = votes.story_id
    WHERE stories.user_id = ?
    GROUP BY stories.id
  `;

  const [result] = await database.pool.query(query, [id]);

  return result;
}

async function setStoryPhoto({ image, id }) {
  const query = `
  UPDATE stories
  SET image = ?
  WHERE id = ?
  `;

  await database.pool.query(query, [image, id]);

  return await findStoriesById({ id });
}

async function deleteStoryPhoto({ image, id }) {
  const query = "DELETE FROM stories SET image =? WHERE id = ?";

  await database.pool.query(query, [image, id]);

  return;
}

module.exports = {
  findStoriesById,
  searchStory,
  createdStory,
  updateStories,
  deleteStories,
  getUserStories,
  getStories,
  setStoryPhoto,
  deleteStoryPhoto,
};
