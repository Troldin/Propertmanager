module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
      price: {
      type: Sequelize.INTEGER
    },
      description: {
      type: Sequelize.STRING
    },
  });

  return Task;
};