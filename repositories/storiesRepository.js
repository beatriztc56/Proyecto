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

async function getRandomStories(n = 5) {
  const query = `
  SELECT stories.*, COUNT(votes.id) as votes
  FROM stories
  LEFT JOIN votes ON stories.id = votes.story_id
  GROUP BY stories.id
  ORDER BY RAND()
  LIMIT ?
  `;

  const [stories] = await database.pool.query(query, [n]);

  return stories;
}
async function getStoriesHome(n = 3) {
  const query = `
  SELECT stories.*, COUNT(votes.id) as votes
  FROM stories
  LEFT JOIN votes ON stories.id = votes.story_id
  GROUP BY stories.id
  ORDER BY RAND()
  LIMIT ?
  `;

  const [stories] = await database.pool.query(query, [n]);

  return stories;
}

async function findStoriesById({ id }) {
  const query = `
    SELECT stories.*, COUNT(votes.id) as votes, users.name as user_name
    FROM stories 
    LEFT JOIN votes ON stories.id = votes.story_id
    INNER JOIN users ON stories.user_id = users.id
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
  const query = "DELETE FROM stories WHERE id = ? ";

  await database.pool.query(query, [id]);

  return;
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

async function setStoryPhoto({ image, id_story, id }) {
  const query = `
  UPDATE stories
  SET image = ?
  WHERE id = ?
  `;

  const [results] = await database.pool.query(query, [image, id_story, id]);

  return results;
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
  getRandomStories,
  setStoryPhoto,
  deleteStoryPhoto,
  getStoriesHome,
};
