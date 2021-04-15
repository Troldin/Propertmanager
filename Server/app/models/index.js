const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
        timestamps: false
    },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

db.users = require("./user.model.js")(sequelize, Sequelize);

db.buildings = require("./building.model.js")(sequelize, Sequelize);

db.units = require("./unit.model.js")(sequelize, Sequelize);

db.contracts = require("./contract.model.js")(sequelize, Sequelize);

db.companies = require("./company.model.js")(sequelize, Sequelize);

db.reports = require("./report.model.js")(sequelize, Sequelize);

db.orders = require("./order.model.js")(sequelize, Sequelize);

db.payments = require("./payment.model.js")(sequelize, Sequelize);

db.tasks = require("./task.model.js")(sequelize, Sequelize);

db.sessions = require("./session.model.js")(sequelize, Sequelize);

db.contracts.belongsTo(db.units, {foreignKey : 'unit_id', as : 'unit'});

db.units.hasMany(db.contracts, {foreignKey : 'unit_id'});

db.contracts.belongsTo(db.users, {foreignKey : 'tenant_id', as : 'tenant'});

db.users.hasMany(db.contracts, {foreignKey : 'tenant_id'});

db.companies.belongsTo(db.users, {foreignKey : 'user_id'});

db.payments.belongsTo(db.contracts, {foreignKey : 'contract_id', as : 'contract'});

db.contracts.hasMany(db.payments, {foreignKey : 'contract_id'});

db.reports.belongsTo(db.users, {foreignKey : 'user_id'});

db.users.hasMany(db.reports, {foreignKey : 'user_id'});

db.reports.belongsTo(db.buildings, {foreignKey : 'building_id', as: 'building'});

db.reports.belongsTo(db.units, {foreignKey : 'unit_id', as: 'unit'});

db.units.hasMany(db.reports, {foreignKey : 'unit_id'});

db.tasks.belongsTo(db.reports, {foreignKey : 'report_id'});

db.reports.hasMany(db.tasks, {foreignKey : 'report_id'});

db.tasks.belongsTo(db.orders, {foreignKey : 'order_id'});

db.orders.hasMany(db.tasks, {foreignKey : 'order_id'});

db.buildings.belongsTo(db.users, {foreignKey : 'restorer_id', as : 'restorer'});

db.users.hasMany(db.buildings, {foreignKey : 'restorer_id'});

db.buildings.belongsTo(db.users, {foreignKey : 'administrator_id', as : 'administrator'});

db.users.hasMany(db.buildings, {foreignKey : 'administrator_id'});

db.units.belongsTo(db.buildings, {foreignKey : 'building_id'});

db.buildings.hasMany(db.units, {foreignKey : 'building_id'});

db.orders.belongsTo(db.users, {foreignKey : 'restorer_id'});


module.exports = db;
