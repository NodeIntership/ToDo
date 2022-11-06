const {
  addProfession,
  getProfessionById,
  getProfessions,
} = require("../Models/profession.model");
let profValidator = require("../Validations/profession.validation");

function createProfession(req, res) {
  let validInfo = profValidator.validate(req.body);
  if (validInfo.error) {
    res.json({ message: validInfo.error.details[0].message });
    return;
  }

  addProfession(req.body)
    .then((info) => {
      res.json(info);
    })
    .catch((e) => {
      res.json({ message: e.message });
    });
}

async function findProfessions(req, res){
    let professions = await getProfessions();
    res.json(professions)
}

async function findById(req, res) {
  let profession = await getProfessionById(req.params.id);
  if (!profession) {
    res.json({ message: "profession not found" });
    return;
  }
  res.json(profession);
}
module.exports = {
  createProfession,
  findById,
  findProfessions,
};
