const testingRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

testingRouter.post("/reset", async (request, response) => {
  try {
    await Note.deleteMany({});
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }

  response.status(204).end();
});

module.exports = testingRouter;
