const notesRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (request, response, next) => {
  try {
    const notes = await Note.find({}).populate("user", {
      username: 1,
      name: 1,
    });

    response.json(notes);
  } catch (error) {
    next(error);
  }
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const noteWithId = await Note.findById(request.params.id);
    if (noteWithId) {
      response.json(noteWithId);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  } else {
    return null;
  }
};

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  });
  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.status(201).json(savedNote);

  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
    });
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
