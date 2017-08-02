const Quack = (sequelize, DataTypes) => {
  const QuackModel = sequelize.define('Quack', {
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  });

  return QuackModel;
};

module.exports = Quack;