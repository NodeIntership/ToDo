const mongoose = require("mongoose");
const { getProfessionById } = require("./profession.model");
const userSchema = require("./Schemas/user.schema");
const userLookup = require("../Config/user.lookup");

const userModel = mongoose.model("users", userSchema);

async function create(info) {
  let prof = await getProfessionById(info.profession);

  if (!prof) {
    return "profession";
  }

  let result = await userModel.create(info);

  return result;
}

async function getUsers() {
  let users = await userModel.find({ isDeleted: { $ne: true } });
  return users;
}

async function getUserById(id) {
  let user = await userModel.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id), isDeleted: { $ne: true } },
    },
    ...userLookup
  ]);

  return user;
}

async function findUserByEmail(mail) {
  let result = await userModel.findOne({ email: mail });
  return result;
}

module.exports = {
  create,
  findUserByEmail,
  getUserById,
  getUsers,
};
