const mongoose = require("mongoose");
const { create } = require("../Models/todoModel");
const { getUsers, addUser } = require("../Models/userModel");
const { findCategories } = require("../Models/categoriesModel");
const { getProfessions } = require("../Models/profession.model");

const { dbUri } = require("../Config/variables");

mongoose.connect(
  "mongodb+srv://ashot_muradyan:lwm1OvmG8pO63ITL@cluster0.cdw8a.mongodb.net/todo"
);

// async function createUsers () {
//     let professions = await getProfessions()

//     for(let i = 0; i < 500; i++){
//         await addUser({
//           name: "User" + i,
//           surname: "Surname" + i,
//           birthday: "2022-11-06",
//           email: `user${i+600}@mail.ru`,
//           profession: professions[Math.floor(Math.random() * professions.length)]._id,
//         });
//     }
// }
// createUsers().then(()=>{console.log("Ok");})
async function createManyTodos() {
  let users = await getUsers();
  let categories = await findCategories();

  users = users.map((value) => value._id);
  categories = categories.map((value) => value._id);
  for (let i = 100; i < 10000; i++) {
    let a = await create({
      title: "title" + i * 3,
      description: "description" + i,
      status: ["PENDING", "COMPLETED"][Math.floor(Math.random() * 2)],
      category: categories[Math.floor(Math.random() * categories.length)],
      userId: users[Math.floor(Math.random() * users.length)],
    });
    console.log(a);
  }
}

createManyTodos().then((res) => {
  console.log(res);
});
