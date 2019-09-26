const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/", { target: "http://localhost:3001/" }));
  app.use(proxy("/api/books", { target: "http://localhost:3001/" }));
  app.use(proxy("/loginUser", { target: "http://localhost:3001/" }));
  app.use(proxy("/registerUser", { target: "http://localhost:3001/" }));
};
