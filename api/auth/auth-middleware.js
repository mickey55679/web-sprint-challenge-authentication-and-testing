const Users = require('./auth-model');

module.exports = {
validateRegister,
}
async function validateRegister(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  // Check if the user already exists
  const existingUser = await Users.findBy({ username });
  if (existingUser) {
    return res.status(400).json({ message: "username taken" });
  }

  // If user doesn't exist, go to the next middleware or route handler
  next();
}
