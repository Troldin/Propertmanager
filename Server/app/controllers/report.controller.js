const db = require("../models");
const Report = db.reports;
const Op = db.Sequelize.Op;
const Building = db.buildings;

// Create and Save a new Report
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Report
  const report = {
    description: req.body.description,
    building_id: req.body.building_id,
    unit_id: req.body.unit_id,
    status: req.body.status,
    user_id: req.body.user_id
  };

  // Save Report in the database
  Report.create(report)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report."
      });
    });
};

// Retrieve all Reports from the database.
exports.findAll = (req, res) => {

  Report.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reports."
      });
    });
};

exports.byUserId = (req, res) => {
  const id = req.params.id;

  Report.findAll({ where: {user_id: id}, include: [
                {
                    association: "unit"
                },
                {
                    association: "building"
                }] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reports."
      });
    });
};

exports.byRestorerId = (req, res) => {
  const id = req.params.id;

  Report.findAll({include: [
                { model: Building, where:{restorer_id: id}, as: 'building', attributes: []}
                
            ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reports."
      });
    });
};

// Find a single Report with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Report.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Report with id=" + id
      });
    });
};

// Update a Report by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Report.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Report was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Report with id=${id}. Maybe Report was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Report with id=" + id
      });
    });
};

// Delete a Report with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Report.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Report was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Report with id=${id}. Maybe Report was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Report with id=" + id
      });
    });
};



// Delete all Reports from the database.
exports.deleteAll = (req, res) => {
  Report.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Reports were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Reports."
      });
    });
};
