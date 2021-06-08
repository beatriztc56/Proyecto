const { database } = require("../infrastructure");

async function findUserById({ id }) {
  const query = "SELECT * FROM users WHERE id = ?";
  const [users] = await database.pool.query(query, [id]);

  return users[0];
}

async function findUserByEmail({ email }) {
  const query = "SELECT * FROM users WHERE email = ?";
  const [users] = await database.pool.query(query, [email]);

  return users[0];
}

async function createUser({ name, email, passwordHash }) {
  const insertQuery =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  const [created] = await database.pool.query(insertQuery, [
    name,
    email,
    passwordHash,
  ]);

  const createdId = created.insertId;

  const newUser = await findUserById({ id: createdId });

  return newUser;
}

async function deleteUser({ id }) {
  const query = "DELETE FROM users WHERE id = ?";

  await database.pool.query(query, id);

  return;
}

async function editUser({ id, name, email, bio, residence, birthdate, font }) {
  const query = `
    UPDATE users
    SET name = ?, email = ?, bio = ?, residence = ?, birthdate = ?, font = ?
    WHERE id = ?
  `;

  await database.pool.query(query, [
    name,
    email,
    bio,
    residence,
    new Date(birthdate),
    font,
    id,
  ]);

  const updatedUser = await findUserById({ id });

  return updatedUser;
}

async function changePassword({ id, passwordHash }) {
  const query = `
    UPDATE users
    SET password = ?
    WHERE id = ?
  `;

  await database.pool.query(query, [passwordHash, id]);

  const updatedUser = await findUserById({ id });

  return updatedUser;
}

async function setUserAvatar({ id, avatar }) {
  const query = `
    UPDATE users
    SET avatar = ?
    WHERE id = ?
  `;

  await database.pool.query(query, [avatar, id]);

  return await findUserById({ id });
}

async function deleteUserAvatar({ id, avatar }) {
  const query = "DELETE FROM users WHERE id = ?";

  await database.pool.query(query, [id, avatar]);

  return;
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  deleteUser,
  editUser,
  changePassword,
  setUserAvatar,
  deleteUserAvatar,
};
