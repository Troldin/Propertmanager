module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
    date: {
      type: Sequelize.DATEONLY
    },
    amount: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    }
  });

  return Payment;
};