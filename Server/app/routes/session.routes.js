module.exports = app => {
  const session = require("../controllers/session.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", session.create);

  // Retrieve all Users
  router.get("/:key", session.check);

  // Delete a User with id
  router.delete("/:key", session.delete);

  // Delete all Users
  router.delete("/:id_user", session.deleteAll);

  
  app.use('/api/session', router);

  
};