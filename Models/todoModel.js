const mongoose = require("mongoose");
const todoSchema = require("./Schemas/todo.schema");
const { findCategoryById } = require("./categoriesModel");
const { userModel } = require("./userModel");
const { lookupUser } = require("../Utils/mongoDB.utils");

const todoModel = mongoose.model("todo", todoSchema);

async function create(info) {
  let category = await findCategoryById(info.category);
  if (!category) {
    throw new Error("category");
  }
  let user = await userModel.findById(info.userId);
  if (!user) {
    throw new Error("user");
  }

  let result = await todoModel.create(info);

  return result;
}

async function findMany(query) {
  let condition = {};
  let limit, offset

  condition.isDeleted = { $ne: true };

  if(query.limit){
    limit = +query.limit
  } else {
    limit = 50
  }
  if(query.offset){
    offset = +query.offset;
  } else {
    offset = 0
  }

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
    { $sort: { date: 1 } },
    { $skip: offset },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userId",
        pipeline: [
          {
            $match: { isDeleted: { $ne: true } },
          },
          ...lookupUser(),
        ],
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
        author: "$userId",
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
