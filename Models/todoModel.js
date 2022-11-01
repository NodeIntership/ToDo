const mongoose = require("mongoose");
const todoSchema = require("./Schemas/todo.schema");
const { findCategoryById } = require("./categoriesModel");
const { getUserById } = require("./userModel");

const todoModel = mongoose.model("todo", todoSchema);

async function create(info) {
  let category = await findCategoryById(info.category);
  if (!category) {
    throw new Error("category");
  }
  let user = await getUserById(info.userId);
  if (!user) {
    throw new Error("user");
  }

  let result = await todoModel.create(info);

  return result;
}

async function findMany(query) {
  let condition = {};

  condition.isDeleted = {$ne: true}

  if (query.category) {
    condition.category = mongoose.Types.ObjectId(query.category);
  }
  if (query.userId) {
    condition.userId = mongoose.Types.ObjectId(query.userId);
  }
  if (query.status) {
    condition.status = query.status;
  }

  let list = await todoModel.aggregate([
    {
      $match: condition,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              id: "$_id",
              name: "$name",
              birthday: "$birthday",
              _id: 0,
            },
          },
        ],
        as: "userId",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              id: "$_id",
              title: "$title",
              _id: 0,
            },
          },
        ],
        as: "category",
      },
    },
    {
      $project: {
        id: "$_id",
        title: "$title",
        description: "$description",
        status: "$status",
        auter: "$userId",
        category: "$category",
        _id: 0,
      },
    },
  ]);
  
  return list;
}

async function findRowById(id) {
  let result = await todoModel
    .findOne({ _id: id, isDeleted: { $ne: true } })
    .populate("category")
    .populate("userId")
    .exec();
  return result;
}

async function updateRow(id, info) {
  let row = await todoModel.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!row) {
    return null;
  }

  for (let key in info) {
    row[key] = info[key];
  }
  await row.save();
  return row;
}

async function removeRow(id) {
  let row = await todoModel.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!row) {
    return null;
  }
  row.isDeleted = true;
  row.save();

  return { message: "Row removed" };
}

module.exports = {
  create,
  findMany,
  findRowById,
  updateRow,
  removeRow,
};
