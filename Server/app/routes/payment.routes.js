module.exports = app => {
  const payments = require("../controllers/payment.controller.js");

  var router = require("express").Router();

  // Create a new payment
  router.post("/", payments.create);
    
    router.get("/byTenantId/:id", payments.byTenantId);

  // Retrieve all payments
  router.get("/", payments.findAll);
    
    // Retrieve all payments
  router.get("/notVerified", payments.findAllNotVerified);

      // Retrieve all payments by admin id
  router.get("/findAllNotVerifiedByAdminId/:id", payments.findAllNotVerifiedByAdminId);

      // Retrieve all payments by admin id
  router.get("/findAllByAdminId/:id", payments.findAllByAdminId);


  // Retrieve a single payment with id
  router.get("/:id", payments.findOne);

  // Update a payment with id
  router.put("/:id", payments.update);

  // Delete a payment with id
  router.delete("/:id", payments.delete);

  // Delete all payments
  router.delete("/", payments.deleteAll);

  app.use('/api/payments', router);
};
