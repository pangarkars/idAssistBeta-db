module.exports = (sequelize, Sequelize) => {
  const IdAssist = sequelize.define("idassists", {
    prompt: {
      type: Sequelize.TEXT,
    },
    input: {
      type: Sequelize.TEXT,
    },
    output: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      type: Sequelize.DATE,
      field: "created_at",
    },

    updatedAt: {
      type: Sequelize.DATE,
      field: "updated_at",
    },
  });
  return IdAssist;
};
