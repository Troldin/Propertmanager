module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define("report", {
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    }
  });

  return Report;
};