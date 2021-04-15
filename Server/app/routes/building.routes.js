module.exports = app => {
  const buildings = require("../controllers/building.controller.js");

  var router = require("express").Router();

  // Create a new Building
  router.post("/", buildings.create);

  // Retrieve all buildings
  router.get("/", buildings.findAll);


  // Retrieve a single building with id
  router.get("/:id", buildings.findOne);
    
  //with administrator_id
  router.get("/byAdministratorId/:id", buildings.byAdministratorId);

  // Update a building with id
  router.put("/:id", buildings.update);

  // Delete a building with id
  router.delete("/:id", buildings.delete);

  // Delete all buildings
  router.delete("/", buildings.deleteAll);

  app.use('/api/buildings', router);
};