const {
  storiesRepository,
  usersRepository,
  votesRepository,
} = require("../repositories");

async function createVotes(req, res, next) {
  try {
    const { id } = req.auth;
    const { story_id } = req.params;

    //Comprobamos que existe la historia
    const story = await storiesRepository.findStoriesById({ id: story_id });

    if (!story) {
      const err = new Error("No existe la historia");
      err.status = 404;

      throw err;
    }

    //Comprobamos que existe el usuario
    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("El usuario no existe");
      err.status = 404;
      throw err;
    }

    //Comprobamos el el usuario no votó previamente la historia
    const voteUser = await votesRepository.findVote({ user_id: id, story_id });

    if (voteUser.length > 0) {
      const err = new Error("Ya has votado a esta historia");
      err.status = 401;
      throw err;
    }

    await votesRepository.createVotes({
      user_id: id,
      story_id,
    });

    const allVotes = await votesRepository.getVotes({ story_id });

    res.send({
      status: "ok",
      data: allVotes,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteVotes(req, res, next) {
  try {
    const { story_id } = req.params;
    const { id } = req.auth;

    //Comprobamos que existe la historia
    const story = await storiesRepository.findStoriesById({ id: story_id });

    if (!story) {
      const err = new Error("No existe la historia");
      err.status = 404;

      throw err;
    }

    //Comprobamos que existe el usuario
    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("El usuario no existe");
      err.status = 404;
      throw err;
    }

    await votesRepository.deleteVotes({
      story_id,
      user_id: id,
    });

    const allVotes = await votesRepository.getVotes({ story_id });

    res.send({
      status: "ok",
      data: allVotes,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createVotes, deleteVotes };
