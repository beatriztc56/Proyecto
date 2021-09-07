const Joi = require("joi");

const {
  commentsRepository,
  storiesRepository,
  usersRepository,
} = require("../repositories");

async function createComments(req, res, next) {
  try {
    const { story_id } = req.params;
    const { id } = req.auth;
    const { text } = req.body;

    const schema = Joi.object({
      text: Joi.string().max(250).required(),
    });

    await schema.validateAsync({ text });

    const story = await storiesRepository.findStoriesById({ id: story_id });

    if (!story) {
      const err = new Error("La historia no existe");
      err.code = 404;
      throw err;
    }

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 404;
      throw err;
    }

    const dataComments = { user_id: id, text, story_id };
    const writeComments = await commentsRepository.createComments(dataComments);

    res.send({
      status: "ok",
      data: writeComments,
    });
  } catch (err) {
    next(err);
  }
}

async function getComments(req, res, next) {
  try {
    const { id } = req.params;

    const story = await storiesRepository.findStoriesById({ id });

    if (!story) {
      const err = new Error("No existe la historia");
      err.status = 404;
      throw err;
    }

    const comments = await commentsRepository.getStoryComments({
      story_id: id,
    });

    story.comments = comments;

    res.send({ status: "ok", data: comments });
  } catch (err) {
    next(err);
  }
}

async function deleteComments(req, res, next) {
  try {
    const { id } = req.auth;
    const { comment_id } = req.params;

    // primero sacamos el comentario
    const comment = await commentsRepository.findCommentsById({
      id: comment_id,
    });

    // Si el comentario no existe devolvemos un 404
    if (!comment) {
      const error = new Error("El comentario no existe");
      error.status = 404;
      throw error;
    }

    // Sacamos la historia a la que corresponde el comentario
    const story_comment = await storiesRepository.findStoriesById({
      id: comment.story_id,
    });

    // Solo borramos el comentario si el usuario del token es el creador del comentario o de la historia
    if (id !== comment.user_id && id !== story_comment.user_id) {
      const error = new Error(
        "No eres el autor del comentario o de la historia"
      );
      error.status = 401;
      throw error;
    }

    await commentsRepository.deleteComments({ id: comment_id });

    res.send({
      status: "ok",
      message: `el comentario con id ${comment_id} fue borrado`,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createComments, deleteComments, getComments };
