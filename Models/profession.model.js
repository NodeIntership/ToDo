const mongoose = require("mongoose");
const professionSchema = require("./Schemas/profession.schema");

const professionModel = mongoose.model("professions", professionSchema);

async function create(info) {
  let prof = await professionModel.findOne({ title: info.title });
  if (prof) {
    throw new Error("such a profession exists");
  }

  let result = await professionModel.create(info);

  return result;
}

async function getProfessions() {
  let professions = await professionModel.find();
  return professions;
}

async function getProfessionById(id) {
  let profession = await professionModel.findById(id);
  return profession;
}

module.exports = {
  create,
  getProfessionById,
  getProfessions
};
