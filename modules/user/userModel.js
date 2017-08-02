const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    confirmCode: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
  });

  return UserModel;
};

module.exports = User;