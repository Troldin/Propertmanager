module.exports = app => {
  const reports = require("../controllers/report.controller.js");

  var router = require("express").Router();

  // Create a new report
  router.post("/", reports.create);

  // Retrieve all reports
  router.get("/", reports.findAll);
    
  router.get("/byUserId/:id", reports.byUserId);
  
  router.get("/byRestorerId/:id", reports.byRestorerId);


  // Retrieve a single report with id
  router.get("/:id", reports.findOne);

  // Update a report with id
  router.put("/:id", reports.update);

  // Delete a report with id
  router.delete("/:id", reports.delete);

  // Delete all reports
  router.delete("/", reports.deleteAll);

  app.use('/api/reports', router);
};
