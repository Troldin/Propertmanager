module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    name: {
      type: Sequelize.STRING
    },
    nip: {
      type: Sequelize.STRING
    },
    regon: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    city_zip: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
  });

  return Company;
};
