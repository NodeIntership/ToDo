const { create, findUserByEmail, getUserById } = require("../Models/userModel");
let userValidate = require("../Validations/user.validation");

async function createUser(req, res){
    let validInfo = userValidate.validate(req.body);
    if (validInfo.error) {
      res.json({ message: validInfo.error.details[0].message });
      return;
    }
    let user = await findUserByEmail(req.body.email);

    if(user){
        res.json({ message: "There is a user with this email" });
        return
    }

    let createdUser = await create(req.body)

    res.send(createdUser)
}

async function findById(req, res){
    let user = await getUserById(req.params.id)
    if(!user){
        res.json({message: "user not found"})
        return
    }
    res.json(user)
}
module.exports = {
  createUser,
  findById,
};