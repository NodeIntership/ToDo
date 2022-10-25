let idValidator = require("../Validations/id.validation")

function validateParamsId (req,res,next){
    let result = idValidator(req.params.id)
    if (result.error){
        res.json({ message: result.error.details[0].message })
        return;
    }
    next()
}

module.exports = validateParamsId