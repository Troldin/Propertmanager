module.exports = app => {
  const contracts = require("../controllers/contract.controller.js");

  var router = require("express").Router();

router.get("/getActive/:id", contracts.getActive);
    
router.get("/getExpired/:id", contracts.getExpired);
    
  router.get("/debts/", contracts.debts);
  
  router.get("/debtsByAdminId/:id", contracts.debtsByAdminId);
  
  // Create a new contract
  router.post("/", contracts.create);

  // Retrieve all contracts
  router.get("/", contracts.findAll);

  // Retrieve a single contract with id
  router.get("/:id", contracts.findOne);

  // Update a contract with id
  router.put("/:id", contracts.update);

  // Delete a contract with id
  router.delete("/:id", contracts.delete);

  // Delete all contracts
  router.delete("/", contracts.deleteAll);

  router.get("/tenantContracts/:id", contracts.tenantContracts);

  


  app.use('/api/contracts', router);
};
