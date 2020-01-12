/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secrets = require("../auth/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedJwt) => {
      if (error) {
        res.status(401).json({ message: "credentials not valid" });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
