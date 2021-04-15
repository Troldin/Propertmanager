const db = require("../models");
const Contract = db.contracts;
const Unit = db.units;
const Building = db.buildings;
const Payment = db.payments;
const Op = db.Sequelize.Op;

// Create and Save a new contract
exports.create = (req, res) => {
  // Validate request
  if (!req.body.unit_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a contract
  const contract = {
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    price: req.body.price,
    unit_id: req.body.unit_id,
    tenant_id: req.body.tenant_id
  };

  // Save contract in the database
  Contract.create(contract)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the contract."
      });
    });
};

// Retrieve all contracts from the database.
exports.findAll = (req, res) => {
  
  Contract.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contracts."
      });
    });
};

// Retrieve all contracts from the database.
exports.getActive = (req, res) => {
      const id = req.params.id;
  
  Contract.findAll({where: {start_date: { [Op.lte]:db.sequelize.fn('NOW')  }, end_date: { [Op.or]: { [Op.gte]:db.sequelize.fn('NOW'), [Op.is]:null } }}, include: [
      
            {
            association: "tenant"
            },
            {
            association: "unit",
            include: [
      
            {
                        association: "building",
                        where: {administrator_id: id}
            }
        
            ]}
        
  ]})
    .then(data => {
      var dataready = [];
      var n = 0;
      for(i = 0; data[i] != undefined; ++i)
          {
              if(data[i].unit != null)
                  {
                      dataready[n++] = data[i];
                  }
          }
      res.send(dataready);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contracts."
      });
    });
};


// Retrieve all contracts from the database.
exports.getExpired = (req, res) => {
      const id = req.params.id;
  
  Contract.findAll({where: {end_date: { [Op.lt]:db.sequelize.fn('NOW') } }, include: [
      
            {
            association: "tenant"
            },
            {
            association: "unit",
            include: [
      
            {
                        association: "building",
                        where: {administrator_id: id}

            }
        
            ]}
        
  ]})
    .then(data => {
      var dataready = [];
      var n = 0;
      for(i = 0; data[i] != undefined; ++i)
          {
              if(data[i].unit != null)
                  {
                      dataready[n++] = data[i];
                  }
          }
      res.send(dataready);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contracts."
      });
    });
};


// Find a single Contract with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contract.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contract with id=" + id
      });
    });
};

// Update a Contract by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Contract.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contract was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Contract with id=${id}. Maybe Contract was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contract with id=" + id
      });
    });
};

// Delete a Contract with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contract.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contract was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Contract with id=${id}. Maybe Contract was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contract with id=" + id
      });
    });
};

// Delete all Contracts from the database.
exports.deleteAll = (req, res) => {
  Contract.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Contracts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contracts."
      });
    });
};

  //Parametr: ID user
  //Wyniik: Tablica z aktualnie wynajętymi przez niego lokalami + budynek w jakim jest lokal + dane kontraktu + saldo,naleznosc,wplaty
  //
exports.tenantContracts = (req, res) => {
  const id = req.params.id;
    Contract.findAll({ where: { tenant_id: id},
      order: [['end_date', 'ASC']],
        include: [
            { model: Unit, as : 'unit', include: [{ model: Building }]},
            { model: Payment}
        ]
    })
        .then(data => {
            var now =new Date();
            for(var i=0; data[i]!=undefined; i++){
              var start_date = new Date(data[i].start_date);
              var miesiace = ((now.getFullYear() - start_date.getFullYear()) * 12) + (now.getMonth() - start_date.getMonth());
              if ((start_date.getDay() - now.getDay()) <= 0)
                 miesiace += 1;

              var naleznosc = data[i].price*miesiace;
              var wplaty=0;
              var oczekujace=0;
              var odrzucone=0;

              for(var j=0; data[i].payments[j]!=undefined; j++){
                if(data[i].payments[j].status==1){
                  wplaty+=data[i].payments[j].amount;
                }
                else if(data[i].payments[j].status==0){
                  oczekujace+=data[i].payments[j].amount;
                }
                else if(data[i].payments[j].status==3){
                  odrzucone+=data[i].payments[j].amount;
                }
              }

              data[i].dataValues.naleznosc=naleznosc;
              data[i].dataValues.zaakceptowane_wplaty=wplaty;
              data[i].dataValues.odrzucone_wplaty=odrzucone;
              data[i].dataValues.oczekujace_wplaty=oczekujace;
              data[i].dataValues.saldo=wplaty-naleznosc;
            }

          res.send(data);
     })
    .catch(err => {
      res.status(500).send({
       message: err.message ||  "Error retrieving unit with id=" + id
      });
    });
};


exports.debts = (req, res) => {
    Contract.findAll({ 
        include: [
            { model: Unit, as : 'unit', include: [{ model: Building }]},
            { model: Payment}
        ]
    })
        .then(data => {
            var now =new Date();
            var n=0; debts=[];
            for(var i=0; data[i]!=undefined; i++){
              var start_date = new Date(data[i].start_date);
              var miesiace = ((now.getFullYear() - start_date.getFullYear()) * 12) + (now.getMonth() - start_date.getMonth());

              if ((start_date.getDay() - now.getDay()) <= 0)
                 miesiace += 1;

              var naleznosc = data[i].price*miesiace;
              var wplaty=0;
              var oczekujace=0;
              var odrzucone=0;

              for(var j=0; data[i].payments[j]!=undefined; j++){
                if(data[i].payments[j].status==1){
                  wplaty+=data[i].payments[j].amount;
                }
                else if(data[i].payments[j].status==0){
                  oczekujace+=data[i].payments[j].amount;
                }
                else if(data[i].payments[j].status==3){
                  odrzucone+=data[i].payments[j].amount;
                }
              }

              data[i].dataValues.naleznosc=naleznosc;
              data[i].dataValues.zaakceptowane_wplaty=wplaty;
              data[i].dataValues.odrzucone_wplaty=odrzucone;
              data[i].dataValues.oczekujace_wplaty=oczekujace;
              data[i].dataValues.saldo=wplaty-naleznosc;

              if(data[i].dataValues.saldo<0){
                debts[n++]=data[i];
              }

            }
          res.send(debts);
     })
    .catch(err => {
      res.status(500).send({
       message: err.message ||  "Error retrieving unit with id=" + id
      });
    });
};


exports.debtsByAdminId = (req, res) => {
  const id = req.params.id;
    Contract.findAll({ 
        include: [
            { model: Unit, as : 'unit', include: [{ model: Building, where: {administrator_id: id} }]},
            { model: Payment}
        ]
    })
        .then(data => {
            var now =new Date();
            var n=0; debts=[];
            for(var i=0; data[i]!=undefined; i++){
              var start_date = new Date(data[i].start_date);
              var miesiace = ((now.getFullYear() - start_date.getFullYear()) * 12) + (now.getMonth() - start_date.getMonth());

              if ((start_date.getDay() - now.getDay()) <= 0)
                 miesiace += 1;

              var naleznosc = data[i].price*miesiace;
              var wplaty=0;
              var oczekujace=0;
              var odrzucone=0;

              for(var j=0; data[i].payments[j]!=undefined; j++){
                if(data[i].payments[j].status==1){
                  wplaty+=data[i].payments[j].amount;
                }
                else if(data[i].payments[j].status==0){
                  oczekujace+=data[i].payments[j].amount;
                }
                else if(data[i].payments[j].status==3){
                  odrzucone+=data[i].payments[j].amount;
                }
              }

              data[i].dataValues.naleznosc=naleznosc;
              data[i].dataValues.zaakceptowane_wplaty=wplaty;
              data[i].dataValues.odrzucone_wplaty=odrzucone;
              data[i].dataValues.oczekujace_wplaty=oczekujace;
              data[i].dataValues.saldo=wplaty-naleznosc;

              if(data[i].dataValues.saldo<0){
                debts[n++]=data[i];
              }

            }
          res.send(debts);
     })
    .catch(err => {
      res.status(500).send({
       message: err.message ||  "Error retrieving unit with id=" + id
      });
    });
};
