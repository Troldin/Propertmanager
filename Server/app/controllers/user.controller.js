const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.surname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // 

    // Create a User
      const user = {
        email: req.body.email,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        phone: req.body.phone,
        city_zip: req.body.city_zip,
        pesel: req.body.pesel,
        type: req.body.type
      };

      // Save User in the database
      User.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body.password);
  if(req.body.password.length != 60){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      req.body.password=hash;
      User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
    }
    );
  }
  else{
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
    }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// Retrieve all Tenants from the database.
exports.findTenants = (req, res) => {
  User.findAll({ where: { type: "1" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving normal users."
      });
    });
};

exports.findRestorers = (req, res) => {
  User.findAll({ where: { type: "2" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adminstrator users."
      });
    });
};

// Retrieve all Admins   from the database.
exports.findAdmins = (req, res) => {
  User.findAll({ where: { type: "3" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adminstrator users."
      });
    });
};
