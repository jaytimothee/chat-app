// userState.js

let user = {};

function updateUser(userData) {
  Object.assign(user, userData);
}

function getUser() {
  return user;
}

module.exports = { updateUser, getUser };
