const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  });

  return UserModel;
};

module.exports = User;