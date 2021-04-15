module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    key: {
      type: Sequelize.CHAR
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    exp_date: {
      type: Sequelize.DATE
    }
  });

  return Session;
};