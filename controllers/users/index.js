const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const patchUser = require("./patch");
const updateAvatar = require("./avatars");

module.exports = { register, login, logout, current, patchUser, updateAvatar };
