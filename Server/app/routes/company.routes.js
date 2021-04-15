module.exports = app => {
  const companies = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Create a new company
  router.post("/", companies.create);

  // Retrieve all companies
  router.get("/", companies.findAll);

  // Retrieve a single company with id
  router.get("/:id", companies.findOne);

  // Update a company with id
  router.put("/:id", companies.update);

  // Delete a company with id
  router.delete("/:id", companies.delete);

  // Delete all companies
  router.delete("/", companies.deleteAll);

  app.use('/api/companies', router);
};
