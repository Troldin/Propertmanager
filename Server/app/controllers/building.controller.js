const db = require("../models");
const Building = db.buildings;
const Op = db.Sequelize.Op;

// Create and Save a new building
exports.create = (req, res) => {
  // Validate request
  if (!req.body.street) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a building
  const building = {
    street: req.body.street,
    building_nr: req.body.building_nr,
    city_zip: req.body.city_zip,
    restorer_id: req.body.restorer_id,
    administrator_id: req.body.administrator_id
  };

  // Save building in the database
  Building.create(building)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the building."
      });
    });
};

// Retrieve all buildings from the database.
exports.findAll = (req, res) => {

  Building.findAll({ include: [
                {
                    association: "administrator",
                    attributes: ["name", "surname"]
                },
                {
                    association: "restorer",
                    attributes: ["name", "surname"]
                }
            ] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving buildings."
      });
    });
};

exports.byAdministratorId = (req, res) => {
  const id = req.params.id;

  Building.findAll({ where: { administrator_id: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving buildings."
      });
    });
};

// Find a single building with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Building.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving building with id=" + id
      });
    });
};

// Update a Building by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Building.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Building was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Building with id=${id}. Maybe Building was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Building with id=" + id
      });
    });
};

// Delete a Building with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Building.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Building was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Building with id=${id}. Maybe Building was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Building with id=" + id
      });
    });
};

// Delete all Buildings from the database.
exports.deleteAll = (req, res) => {
  Building.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Buildings were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Buildings."
      });
    });
};
