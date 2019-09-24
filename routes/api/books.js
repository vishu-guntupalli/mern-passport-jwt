const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const jwt = require("jsonwebtoken");
const jwtVerify = require("../../config/jwt");

// Matches with "/api/books"
router.route("/")
  .get(jwtVerify.confirmToken, jwtVerify.verifyToken, booksController.findAll)
  .post(jwtVerify.confirmToken, jwtVerify.verifyToken, booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(jwtVerify.confirmToken, jwtVerify.verifyToken, booksController.findById)
  .put(jwtVerify.confirmToken, jwtVerify.verifyToken, booksController.update)
  .delete(jwtVerify.confirmToken, jwtVerify.verifyToken, booksController.remove);

module.exports = router;
