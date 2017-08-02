const Reaction = (sequelize, DataTypes) => {
  const ReactionModel = sequelize.define('Reaction', {
    emoji: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
  });

  return ReactionModel;
};

module.exports = Reaction;