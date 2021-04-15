module.exports = (sequelize, Sequelize) => {
  const Unit = sequelize.define("unit", {
    unit_nr: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  });

  return Unit;
};