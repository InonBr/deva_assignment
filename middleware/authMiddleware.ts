require("dotenv").config();
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const bToken = req.headers.authorization;

  if (!bToken) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  const token = bToken.split(" ")[1];

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    console.log(decoded);

    req.currentUser = decoded;
    next();
  });
};

export default authMiddleware;
