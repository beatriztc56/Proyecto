const jwt = require("jsonwebtoken");

const { database } = require("../infrastructure");

async function validateAuthorization(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      const error = new Error("Authorization header required");
      error.code = 401;
      throw error;
    }

    const token = authorization.slice(7, authorization.length);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Comprobamos que el usuario para el que fue emitido
    // el token todavía existe.
    const query = "SELECT * FROM users WHERE id = ?";
    const [users] = await database.pool.query(query, decodedToken.id);

    if (!users || !users.length) {
      const error = new Error("El usuario ya no existe");
      error.code = 401;
      throw error;
    }

    req.auth = decodedToken;
    // req.auth = {id: 5} - esto es lo que valdría req.auth para el token del usuario con id 5
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { validateAuthorization };
