const db = require("../models");
const Session = db.sessions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');


const User = db.users;


var crypto = require('crypto');

// Create and Save a new Session
exports.create = (req, res) => {
  // Validate request
 /* 
 if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  */

 User.findAll({ where: { email: req.body.email} })
    .then(data => {
        //console.log(data[0]);
    if(data[0]!=undefined){
      bcrypt.compare(req.body.password, data[0].dataValues.password, function(err, result) {
      if(data[0]==undefined||data[0].dataValues.id==null||result==false){
        //console.log(data);
        res.send({
          message: `Niepoprawne dane logowania!`
        });
      }
      else{
          var type=data[0].dataValues.type;
          const key = crypto.randomBytes(20)
                .toString('hex') // convert to hexadecimal format
                .slice(0, 39)+type; // return required number of characters
          const exp_date =new  Date();
          //exp_date.setDate(exp_date.getDate() + 1); 
          exp_date.setTime(exp_date.getTime() + 3600000); 
          // Create a Session
          const session = {
            key: key,
            user_id: data[0].dataValues.id,
            exp_date: exp_date
          };
          // Save Session in the database
         
          Session.create(session)
            .then(data => {
              data.dataValues.user_type=type;
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Session."
              });
            })
          }
        });
      }
      else{
        res.send({
          message: `Niepoprawne dane logowania!`
        });
      }     

            })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while search the User."
      });



    });
};


// Find a single Session with an id
exports.check = (req, res) => {
  const key = req.params.key;
  console.log(key);

  Session.findAll({
    where: { key: key }
  })
    .then(data => {
      if(data[0]==undefined){
        res.send({
          message: `Niepoprawny klucz sesji!`
        });
      }
      else{
      res.send(data[0]);
     }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Session with key=" + key
      });
    });
};

// Update a Session by the id in the request
exports.update = (req, res) => {
  const key = req.params.key;

  Session.update(req.body, {
    where: { key: key }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Session was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Session with key=${key}. Maybe Session was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Session with key=" + key
      });
    });
};

// Delete a Session with the specified id_user in the request
exports.delete = (req, res) => {
  const key = req.params.key;

  Session.destroy({
    where: { key: key }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Session was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Session with key=${key}. Maybe Session was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Session with key=" + key
      });
    });
};

// Delete all Sessions from the database.
exports.deleteAll = (req, res) => {
  Session.destroy({
    where: {user_id: id},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sessions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sessions."
      });
    });
};
 
