module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },
      date: {
      type: Sequelize.DATEONLY
    }
  });

  return Order;
};