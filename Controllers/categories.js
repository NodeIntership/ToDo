const catModel = require("../Models/categoriesModel");

function createCategory(req, res){
    let category = new catModel({
        title: req.body.title
    })
    category.save().
    then(()=>{
        res.send("Ok")
    }).
    catch(e=>{
        if(e){
            res.send("There is a category with this title");
        }
    })
}

async function readeCategory(req, res) {
  let categories = await catModel.find();
  
  if (categories.length) {
    res.json(categories);
    return;
  }
  res.send("categories list empty");
}

async function readeOneCategory(req, res) {
  if (!req.query.id) {
    res.send(
      `Please enter ID on the link. example: http://localhost:3000/category/readone?id=your id`
    );
    return;
  }

  let cat = await catModel.findById(req.query.id);

  if (!cat) {
    res.send("There is no category with id");
    return;
  }

  res.json(cat);
}

async function changeCategory(req, res) {
  if (!req.body) {
    res.send("please fill in both fields");
    return;
  }
  let { id, title } = req.body;

  let cat = await catModel.findById(id);

  if (!cat) {
    res.send("There is no category with id");
    return;
  }
  cat.title = title;

  await cat.save();

  res.send("Ok");
}

async function deleteCategory(req, res) {
  if (!req.query.id) {
    res.send(
      `Please enter ID on the link. example: http://localhost:3000/category/remove?id=your id`
    );
    return;
  }

  let cat = await catModel.findByIdAndRemove(req.query.id);

  if (!cat) {
    res.send("There is no category with id");
    return;
  }

  res.json("category removed");
}

module.exports = {
  createCategory,
  readeCategory,
  readeOneCategory,
  changeCategory,
  deleteCategory,
};