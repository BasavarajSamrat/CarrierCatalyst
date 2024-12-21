const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);

    const userId = decodedToken.userId;
    console.log(userId);

    req.body.userId = userId;
    next();
    
  } catch (error) {
    res.status(401).send({
      message: "You are not authenticated",
      data: error,
      success: false,
    });
  }
};
