const db = require("../models");
const Unit = db.units;
const User = db.users;
const Building = db.buildings;

const Contract = db.contracts;

const Op = db.Sequelize.Op;

const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create and Save a new unit
exports.create = (req, res) => {
  // Validate request
  if (!req.body.building_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a unit
  const unit = {
    unit_nr: req.body.unit_nr,
    building_id: req.body.building_id,
    price: req.body.price
  };

  // Save unit in the database
  Unit.create(unit)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the unit."
      });
    });
};

// Retrieve all units from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  Unit.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units."
      });
    });
};

// Find a single unit with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Unit.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving unit with id=" + id
      });
    });
};

// Update a unit by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Unit.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Unit was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Unit with id=${id}. Maybe Unit was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Unit with id=" + id
      });
    });
};

// Delete a Unit with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Unit.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Unit was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Unit with id=${id}. Maybe Unit was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Unit with id=" + id
      });
    });
};

// Delete all Units from the database.
exports.deleteAll = (req, res) => {
  Unit.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Units were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Units."
      });
    });
};


// Find current tenant
exports.currentTenant = (req, res) => {
  const id = req.params.id;

  Contract.findOne({where: {unit_id:id, start_date: { [Op.lte]:db.sequelize.fn('NOW')  }, end_date: { [Op.or]: { [Op.gte]:db.sequelize.fn('NOW'), [Op.is]:null } }}}).then(data => {
      if (data == null) res.send([]); 
      else {
      User.findOne({where: {id: data.tenant_id}})
    .then(data => {
      res.send(data);
    })}})
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving unit with id=" + id
      });
    });
};

// Find all tenant units by id tenant
//Parametr: ID user
//Wyniik: Tablica z aktualnie wynajętymi przez niego lokalami + budynek w jakim jest lokal + dane kontraktu
exports.tenantUnits = (req, res) => {
	const id = req.params.id;
  Unit.findAll({ limit: 25,
  	include: [
                { model: Contract, where:{tenant_id:id, start_date: { [Op.lte]:db.sequelize.fn('NOW') }, end_date: { [Op.or]: { [Op.gte]:db.sequelize.fn('NOW'), [Op.is]:null }}}},
                { model: Building}
                
            ]})
  .then(data => {
		res.send(data); 
     })
    .catch(err => {
      res.status(500).send({
       message: err.message ||  "Error retrieving unit with id=" + id
      });
    });
};



exports.findByBuildingId = (req, res) => {
  const id = req.params.id;
    
  Unit.findAll({ where: { building_id: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units by buildingid."
      });
    });
};


exports.getAvailable = (req, res) => {
  const id = req.params.id;
    
  Unit.findAll(
  
  {where: {building_id: id}, include: [
                {
                    association: "contracts",
                    where: {end_date: { [Op.or]: { [Op.gte]:db.sequelize.fn('NOW'), [Op.is]:null }}},
                    required: false
                }
      ]}
  
  
  
  )
    .then(data => {
      
      
      var dataready = [];
      var n = 0;
      for(i = 0; data[i] != undefined; ++i)
          {
              if(data[i].contracts[0] == undefined)
                  {
                      dataready[n++] = data[i];
                  }
          }
      res.send(dataready);
      

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units by buildingid."
      });
    });
};

//Parametr: ID budynku
//Wyniik: Tablica z aktualnie wynajętymi w nim lokalami + kontrakty + user wynajmujący
exports.buildingUnitsTenants = (req, res) => {
  const id = req.params.id;
    
   Unit.findAll({ limit: 25, where:{building_id:id}, 
  	include: [
                { model: Contract, where:{start_date: { [Op.lte]:db.sequelize.fn('NOW') }, end_date: { [Op.or]: { [Op.gte]:db.sequelize.fn('NOW'), [Op.is]:null }}}, 
                include: [{ model: User}]}
            ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units by buildingid."
      });
    });
};


exports.stats = (req, res) => {    
  Building.findAll(
   { include: [
                { model:Unit, include: [
                {
                    association: "contracts",
                    where: {end_date: { [Op.or]: { [Op.gte]:db.sequelize.fn('NOW'), [Op.is]:null }}},
                    required: false,
                     include: [
                      { association: "tenant"}]
                }]}
                
      ]}
  )
    .then(data => {
      
      let pdfDoc = new PDFDocument;
      let writeStream=fs.createWriteStream('./generatedPDF/RaportMieszkaniowy.pdf');
      pdfDoc.pipe(writeStream);
      pdfDoc.font('./app/fonts/CalibriLight.ttf');
      
      
      let date = new Date();
      pdfDoc
        .fontSize(10)
        .text("Wygenerowano: "+date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(), {  align: 'left' });

      pdfDoc
        .fontSize(14)
        .text("PROMANAGER", {  align: 'right' });

      pdfDoc
        .fontSize(26)
        .text("Raport Mieszkaniowy", { underline: true, align: 'center' });

         

    for(i = 0; data[i] != undefined; ++i) {
      pdfDoc.fontSize(26).text(" ");
      pdfDoc
        .fontSize(18)
        .text((i+1)+"#  "+"Adres budynku: "+data[i].city_zip+" ul. "+data[i].street+" "+data[i].building_nr, { underline: true });
      for(j = 0; data[i].units[j] != undefined; ++j) {
        pdfDoc.fontSize(14).text(" ");
        pdfDoc
          .fontSize(14)
          .text("     "+(j+1)+">  "+"Numer lokalu: "+data[i].units[j].unit_nr);
        if(data[i].units[j].contracts[0] == undefined)
          {
            pdfDoc
              .fontSize(14)
              .text("           Mieszkanie jest wolne, czynsz:"+data[i].units[j].price+"PLN");
          }
        else{
          let end_date=data[i].units[j].contracts[0].end_date;
          if(end_date==null)end_date=" oo";
          pdfDoc
            .fontSize(14)
            .text("           Mieszkanie zajmuje: "+data[i].units[j].contracts[0].tenant.name +" "+data[i].units[j].contracts[0].tenant.surname+", telefon: "+data[i].units[j].contracts[0].tenant.phone);
            pdfDoc
            .fontSize(14)
            .text("             Czas trwania umowy: "+data[i].units[j].contracts[0].start_date +" - "+end_date +", czynsz: "+data[i].units[j].contracts[0].price+"PLN");
        }
      }

}

pdfDoc.end();
      console.log(data)
      /*var dataready = [];
      var n = 0;
      for(i = 0; data[i] != undefined; ++i)
          {
              if(data[i].contracts[0] == undefined)
                  {
                      dataready[n++] = data[i];
                  }
          }*/
          //res.send(data);
  writeStream.on('finish', function () {
    res.contentType("application/pdf");
    res.download('./generatedPDF/RaportMieszkaniowy.pdf');
  });
     
      

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units by buildingid."
      });
    });
};




exports.test = (req, res) => {
  const title = req.query.title;

  Building.findAll(
   { include: [
                { model:Unit, include: [
                {
                    association: "reports",
                    required: false,
                     include: [
                      { association: "tasks",
                        include: [
                            {
                            association: "order"
                            }
                        ]
                       
                       }]
                }]}
                
      ]}
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units."
      });
    });
};



//rentownosc
exports.profitability = (req, res) => { 
    const from = req.body.from;
    const to = req.body.to;


  Building.findAll(
   { include: [
                { model:Unit, include: [
                {
                    association: "contracts",
                    required: false,
                     include: [
                      { association: "payments",
                        where: {
                            
                            date: { [Op.gte]:from, [Op.lte]:to}
                            
                        }
                       
                       }]
                }]}
                
      ]}
  )
    .then(data => {
      
      
      
      Building.findAll(
   { include: [
                { model:Unit, include: [
                {
                    association: "reports",
                    required: false,
                     include: [
                      { association: "tasks",
                        include: [
                            {
                            association: "order",
                            where: {
                            
                            date: { [Op.gte]:from, [Op.lte]:to}
                            
                        }
                            }
                        ]
                       
                       }]
                }]}
                
      ]}
  ).then(data2 => {
      
      
      
      
      let pdfDoc = new PDFDocument;
      let writeStream=fs.createWriteStream('./generatedPDF/rentownosc.pdf');
      pdfDoc.pipe(writeStream);
      pdfDoc.font('./app/fonts/CalibriLight.ttf');

      let date = new Date();
      pdfDoc
        .fontSize(10)
        .text("Wygenerowano: "+date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(), {  align: 'left' });

      pdfDoc
        .fontSize(14)
        .text("PROMANAGER", {  align: 'right' });

      pdfDoc
        .fontSize(26)
        .text("Rentownosc", { underline: true, align: 'center' });

         

    for(i = 0; data[i] != undefined; ++i) {
      pdfDoc.fontSize(26).text(" ");
      pdfDoc
        .fontSize(18)
        .text((i+1)+"#  "+"Adres budynku: "+data[i].city_zip+" ul. "+data[i].street+" "+data[i].building_nr, { underline: true });
      for(j = 0; data[i].units[j] != undefined; ++j) {
        pdfDoc.fontSize(14).text(" ");
        pdfDoc
          .fontSize(14)
          .text("     "+(j+1)+">  "+"Numer lokalu: "+data[i].units[j].unit_nr);
                var wplaty=0;
	
          for(c = 0; data[i].units[j].contracts[c] != undefined; ++c){
            for(p = 0; data[i].units[j].contracts[c].payments[p] != undefined; ++p){
              wplaty+=data[i].units[j].contracts[c].payments[p].amount;
              
            }
          }
	      var koszty=0
	  for(c = 0; data2[i].units[j].reports[c] != undefined; ++c){
            for(p = 0; data2[i].units[j].reports[c].tasks[p] != undefined; ++p){
              koszty+=data2[i].units[j].reports[c].tasks[p].price;
              
            }
          }    
	      
          pdfDoc
          .fontSize(14)
          .text("           "+"Zysk: "+wplaty+ " PLN" + "    Koszty: "+koszty+" PLN"+ "   Rentowność: "+(wplaty-koszty)+" PLN");
        
      }

    }

pdfDoc.end();
      /*var dataready = [];
      var n = 0;
      for(i = 0; data[i] != undefined; ++i)
          {
              if(data[i].contracts[0] == undefined)
                  {
                      dataready[n++] = data[i];
                  }
          }*/
          //res.send(data);
  writeStream.on('finish', function () {
    res.contentType("application/pdf");
    res.download('./generatedPDF/rentownosc.pdf');
  });
     
      

    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units by buildingid."
      });
    });})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving units by buildingid."
      });
    });
};
