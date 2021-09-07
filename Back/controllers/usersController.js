const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { saveImage } = require("../helpers");

const {
  usersRepository,
  storiesRepository,
  commentsRepository,
} = require("../repositories");

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const registerSchema = Joi.object({
      name: Joi.string().required().max(255),
      email: Joi.string().email().required().max(255),
      password: Joi.string().min(6).max(100).required(),
    });

    await registerSchema.validateAsync({ name, email, password });

    const user = await usersRepository.findUserByEmail({ email });

    //si ya hay un usuario con el mismo email generamos un error
    if (user) {
      const err = new Error("Ya existe un usuario con ese email");
      err.status = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await usersRepository.createUser({
      name,
      email,
      passwordHash,
    });

    const tokenPayload = { id: createdUser.id };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201);
    res.send({
      status: "ok",
      data: {
        token,
        user: createdUser,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const { user_id } = req.params;
    const { id } = req.auth;

    const user = await usersRepository.findUserById({ id: user_id });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.status = 404;
      throw error;
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      residence: user.residence,
      birthdate: user.birthdate,
    };

    if (user.id === id) {
      // yo soy el usuario del que que estoy viendo la información
      const stories = await storiesRepository.getUserStories({ id: user.id });

      userInfo.stories = stories;

      // hacer lo mismo para comentarios
    }

    if (user.id === id) {
      const comments = await commentsRepository.getUserComments({
        id: user.id,
      });

      userInfo.comments = comments;
    }

    res.send({
      status: "ok",
      data: userInfo,
    });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    await schema.validateAsync({ email, password });

    const user = await usersRepository.findUserByEmail({ email });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.code = 404;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error("La contraseña no es válida");
      error.code = 401;
      throw error;
    }

    const tokenPayload = { id: user.id };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send({ status: "ok", data: { user, token } });
  } catch (err) {
    next(err);
  }
}

async function editUser(req, res, next) {
  try {
    const { id } = req.auth;

    // La fecha en formato iso podéis encontrarla aquí: https://www.utctime.net/ (es la ISO-8601)
    const { name, email, bio, residence, birthdate, font } = req.body;

    console.log(req.body);

    const schema = Joi.object({
      name: Joi.string().required().max(255),
      email: Joi.string().email().required().max(255),
      bio: Joi.string().allow("", null),
      residence: Joi.string().max(255).allow("", null),
      birthdate: Joi.date().iso().allow("", null),
      font: Joi.string().max(255),
    });

    await schema.validateAsync({
      name,
      email,
      bio,
      residence,
      birthdate,
      font,
    });

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.status = 401;
      throw error;
    }

    const updatedUser = await usersRepository.editUser({
      id,
      name,
      email,
      bio,
      residence,
      birthdate,
      font,
    });

    res.send({
      status: "ok",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    const { id } = req.auth;

    const { password, newPassword } = req.body;

    // Sacamos el usuario de la base de datos por la id del req.auth
    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.status = 404;
      throw error;
    }

    // Comprobamos que la contraseña actual que manda es correcta

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error("La contraseña actual no es correcta");
      error.status = 401;
      throw error;
    }

    // Validamos que la nueva contraseña proporcionada pasa los requerimientos
    const schema = Joi.object({
      newPassword: Joi.string().min(6).max(100).required(),
    });

    await schema.validateAsync({ newPassword });

    // Cambiamos la contraseña
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const updatedUser = await usersRepository.changePassword({
      id,
      passwordHash,
    });

    res.send({
      status: "ok",
      data: updatedUser,
    });

    //Se devolvería un correo con url para introducir una contraseña nueva
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.auth;

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("El usuario no existe");
      err.status = 404;
      throw err;
    }

    await usersRepository.deleteUser({ id });

    res.send({
      status: "ok",
      message: `El usuario con id ${id} fue borrado`,
    });
  } catch (err) {
    next(err);
  }
}

async function setAvatar(req, res, next) {
  try {
    const { id } = req.auth;

    //Comprobar que realmente se envió un fichero y si no dar un error
    if (!req.files || !req.files.avatar) {
      const error = new Error("No se envió ningún fichero");
      error.status = 400;
      throw error;
    }

    //Procesar el fichero y guardarlo en un directorio con un nombre único
    const savedImage = await saveImage({ data: req.files.avatar.data });

    //Guardar ese nombre de fichero en la tabla de usuarios
    const user = await usersRepository.setUserAvatar({
      id,
      avatar: savedImage,
    });

    //Dar una respuesta
    res.send({
      status: "ok",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteAvatar(req, res, next) {
  try {
    const { id } = req.auth;
    const { avatar } = req.files;

    if (!avatar) {
      const error = new Error("No puedes borrar el avatar");
      error.status = 400;
      throw error;
    }

    const deleteImage = await deleteImage({ data: req.files.avatar.data });

    const user = await usersRepository.deleteUserAvatar({
      id,
      avatar: deleteImage,
    });

    res.send({
      status: "El avatar ha sido borrado",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUser,
  loginUser,
  editUser,
  changePassword,
  deleteUser,
  setAvatar,
  deleteAvatar,
};
