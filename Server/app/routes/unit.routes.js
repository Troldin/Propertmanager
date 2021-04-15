module.exports = app => {
  const units = require("../controllers/unit.controller.js");

  var router = require("express").Router();

        router.get("/test", units.test);


  // Create a new unit
  router.post("/", units.create);

  // Retrieve all units
  router.get("/", units.findAll);

      router.get("/getAvailable/:id", units.getAvailable);

    router.get("/stats", units.stats);


  router.post("/profitability", units.profitability);
    
  // Retrieve a single unit with id
  router.get("/:id", units.findOne);

    
  // Update a unit with id
  router.put("/:id", units.update);

  // Delete a unit with id
  router.delete("/:id", units.delete);

  // Delete all units
  router.delete("/", units.deleteAll);
    
  // Retrieve units by buildingid
  router.get("/byBuildingId/:id", units.findByBuildingId);
    
  router.get("/currentTenant/:id", units.currentTenant);

  router.get("/tenantUnits/:id", units.tenantUnits);

  router.get("/buildingUnitsTenants/:id", units.buildingUnitsTenants);
    
  

    
    
  app.use('/api/units', router);
};
