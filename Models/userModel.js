const mongoose = require("mongoose");
const { lookupUser } = require("../Utils/mongoDB.utils");
const { getProfessionById } = require("./profession.model");
const userSchema = require("./Schemas/user.schema");

const userModel = mongoose.model("users", userSchema);

async function addUser(info) {
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
    {
      $lookup: {
        from: "todos",
        localField: "_id",
        foreignField: "userId",
        as: "todos",
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { date: 1 } },
          { $limit: 2 },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $project: {
              id: "$_id",
              title: true,
              description: true,
              category: true,
              date: true,
              _id: false,
            },
          },
        ],
      },
    },
    ...lookupUser(),
  ]);

  return user;
}

async function findUserByEmail(mail) {
  let result = await userModel.findOne({ email: mail });
  return result;
}

module.exports = {
  addUser,
  findUserByEmail,
  getUserById,
  getUsers,
  userModel,
};
