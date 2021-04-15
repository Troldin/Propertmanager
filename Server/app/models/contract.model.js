module.exports = (sequelize, Sequelize) => {
  const Contract = sequelize.define("contract", {
    start_date: {
      type: Sequelize.DATEONLY
    },
    end_date: {
      type: Sequelize.DATEONLY
    },
    price: {
      type: Sequelize.INTEGER
    }
  });
    
  return Contract;
};