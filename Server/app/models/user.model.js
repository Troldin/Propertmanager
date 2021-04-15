module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.CHAR
    },
    password: {
      type: Sequelize.CHAR
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    city_zip: {
      type: Sequelize.STRING
    },
    pesel: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};
