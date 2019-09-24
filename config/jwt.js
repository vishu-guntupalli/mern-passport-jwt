const jwt = require("jsonwebtoken");
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
module.exports = {
  confirmToken: function(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    console.log("verifyToken, bearerHeader:", bearerHeader);

    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    console.log("bearerToken:", bearerToken);
    // Check if bearer is undefined
    if (bearerToken !== "null") {
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.status(401).json({ message: "Token not provided" });
    }
  },
  verifyToken: function(req, res, next) {
    console.log("Attempting to verify token:", req.token);
    jwt.verify(req.token, "jwt-secret", (err, authData) => {
      if (err) {
        res.sendStatus(403);
        res.json({
          message: "Token is not valid"
        });
      } else {
        next();
      }
    });
  }
};