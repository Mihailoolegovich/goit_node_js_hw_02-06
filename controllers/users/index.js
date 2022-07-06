const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const patchUser = require("./patch");
const updateAvatar = require("./avatars");
const verifyEmail = require("./verifyEmail");
const verifyEmailAgain = require("./verifyEmailAgain");

module.exports = {
  register,
  login,
  logout,
  current,
  patchUser,
  updateAvatar,
  verifyEmail,
  verifyEmailAgain,
};
