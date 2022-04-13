module.exports = (app) => {
  const idassists = require("../controllers/idassist.controller");
  var router = require("express").Router();
  // Create a new record
  router.post("/", idassists.create);

  app.use("/api/idassists", router);

  router.get("/", idassists.sendKey);
  app.use("/key", router);
};
