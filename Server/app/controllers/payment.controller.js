const db = require("../models");
const Payment = db.payments;
const Op = db.Sequelize.Op;

// Create and Save a new Payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.amount) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Payment
  const payment = {
    date: req.body.date,
    amount: req.body.amount,
    status: req.body.status,
    contract_id: req.body.contract_id
  };

  // Save Payment in the database
  Payment.create(payment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment."
      });
    });
};

// Retrieve all Payments from the database.
exports.findAll = (req, res) => {
  

  Payment.findAll({include: [
                {
                    association: "contract",
                    include: [
                        {
                            association: "tenant"
                        }
                    ]
                }
                ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Payments."
      });
    });
};

exports.byTenantId = (req, res) => {
const id = req.params.id;

Payment.findAll({include: [
                {
                    association: "contract",
                    where: {tenant_id: id}
                }
                ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Payments."
      });
    });
};

exports.findAllByAdminId = (req, res) => {
    const id = req.params.id;
      Payment.findAll({include: [
                {
                    association: "contract",
                    include: [
                        {
                            association: "tenant",
                            association: "unit",
                            include: [
                        {
                          association: "building",
                          where: {administrator_id: id}
                        }]
                        }
                    ]
                }
                ]})
    .then(data => {
      var notnull=[]; var n=0;

      for(i=0;data[i]!=undefined;i++){
        if(data[i].contract.unit !=null){
          notnull[n++]=data[i];
        }
      }

      res.send(notnull);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Payments."
      });
    });
};

exports.findAllNotVerified = (req, res) => {
  

  Payment.findAll({where: {status: 0},include: [
                {
                    association: "contract",
                    include: [
                        {
                            association: "tenant"
                        }
                    ]
                }
                ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Payments."
      });
    });
};

exports.findAllNotVerifiedByAdminId = (req, res) => {
    const id = req.params.id;
      Payment.findAll({where: {status: 0},include: [
                {
                    association: "contract",
                    include: [
                        {
                            association: "tenant",
                            association: "unit",
                            include: [
                        {
                          association: "building",
                          where: {administrator_id: id}
                        }]
                        }
                    ]
                }
                ]})
    .then(data => {
      var notnull=[]; var n=0;

      for(i=0;data[i]!=undefined;i++){
        if(data[i].contract.unit !=null){
          notnull[n++]=data[i];
        }
      }

      res.send(notnull);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Payments."
      });
    });
};

// Find a single Payment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payment.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Payment with id=" + id
      });
    });
};

// Update a Payment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Payment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Payment with id=${id}. Maybe Payment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payment with id=" + id
      });
    });
};

// Delete a Payment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Payment with id=${id}. Maybe Payment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payment with id=" + id
      });
    });
};

// Delete all Payments from the database.
exports.deleteAll = (req, res) => {
  Payment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Payments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Payments."
      });
    });
};
