const listModel = require("../Models/todoModel");

async function createRow(req, res) {
  if(!req.bode){
      return res.send("Please write description")
  }

  let newRow = new listModel({
    description: req.body.description,
  });

  await newRow.save();

  res.send("Ok");
}

async function readeList(req, res) {
  let list = await listModel.find();
  if (list.length) {
    res.json(list);
    return;
  }
  res.send("todo list empty");
}

async function readeOne(req, res){
    if(!req.query.id){
        res.send(
          `Please enter ID on the link. example: http://localhost:3000/readone?id=your id`
        );
        return
    }
    
    let row = await listModel.findById(req.query.id)

    if (!row) {
      res.send("There is no row with id");
      return;
    }

    res.json(row)
}

async function changeRow(req, res){
    if(!req.bode){
        res.send("please fill in both fields");
        return
    }
    let {id, description} = req.body

    let row = await listModel.findById(id)

    if(!row){
        res.send("There is no row with id");
        return
    }
    row.description = description;
    console.log(row);
    await row.save()

    res.send("Ok")
}

async function deleteRow(req, res){
    if (!req.query.id) {
      res.send(
        `Please enter ID on the link. example: http://localhost:3000/remove?id=your id`
      );
      return;
    }

    let row = await listModel.findByIdAndRemove(req.query.id);

    if (!row) {
      res.send("There is no row with id");
      return;
    }

    res.json("Row removed");
}

module.exports = {
  createRow,
  readeList,
  readeOne,
  changeRow,
  deleteRow
};
