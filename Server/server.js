const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();



var corsOptions = {
  origin: "http://zettawhit.com:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
const Session = db.sessions;

// simple route
app.all("*", (req, res, next) => {
  console.log(req.url);
if(req.url=="/api/session"){
  console.log(req.body);  
	next();
}
else{
  var key=null;
  //const cmd =req.url.slice(41);

	for(var i=0;req.rawHeaders[i]!=undefined;i++){
		if(req.rawHeaders[i]=="Authorization"){
			key=req.rawHeaders[i+1];
			break;
		}
		//console.log(req.rawHeaders[i]);
	}

  console.log("key: "+ key);
  //console.log("cmd: "+ cmd);

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
      next();
     }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Session with key=" + key
      });
    });
}
  
});


require("./app/routes/user.routes")(app);
require("./app/routes/session.routes")(app);
require("./app/routes/building.routes")(app);
require("./app/routes/unit.routes")(app);
require("./app/routes/contract.routes")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/report.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/task.routes")(app);






// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});