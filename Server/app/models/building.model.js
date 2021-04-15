module.exports = (sequelize, Sequelize) => {
  const Building = sequelize.define("building", {
    street: {
      type: Sequelize.STRING
    },
    building_nr: {
      type: Sequelize.STRING
    },
    city_zip: {
      type: Sequelize.STRING
    }
  });

  return Building;
};