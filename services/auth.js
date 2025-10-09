const jwt = require('jsonwebtoken');
const secret = "supersecretkey";

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
