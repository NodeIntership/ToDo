const mongoose = require("mongoose");
const userSchema = require("./Schemas/user.schema");

const userModel = mongoose.model("users", userSchema);

async function create(info) {
  let result = await userModel.create(info);

  return result;
}

async function getUsers(){
  let users = await userModel.find({ isDeleted: { $ne: true } });
  return users;
}

async function getUserById(id) {
  let user = await userModel.findOne({_id: id, isDeleted: {$ne: true}});
  return user;
}

async function findUserByEmail(mail) {
  let result = await userModel.findOne({ email: mail })
  return result
}

module.exports = {
  create,
  findUserByEmail,
  getUserById,
  getUsers,
};
