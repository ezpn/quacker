const Notification = (sequelize, DataTypes) => {
  const NotificationModel = sequelize.define('Notification', {
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      validate: {
        isUrl: true,
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return NotificationModel;
};

module.exports = Notification;