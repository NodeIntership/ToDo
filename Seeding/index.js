const mongoose = require("mongoose");
const { create } = require("../Models/todoModel");
const { getUsers } = require("../Models/userModel");
const { findCategories } = require("../Models/categoriesModel")
const { dbUri } = require("../Config/variables");


mongoose.connect(dbUri);



async function createManyTodos() {
    let users = await getUsers();
    let categories = await findCategories();
    
    users = users.map(value => value._id)
    categories = categories.map((value) => value._id);
    for(let i = 0; i < 100; i++){
        let a = await create({
          title: "q" + i,
          description: "r3 y 5" + i,
          status: "PENDING",
          category: categories[Math.floor(Math.random() * categories.length)],
          userId: users[Math.floor(Math.random() * users.length)],
        });
        console.log(a);
    }
}

createManyTodos().then(res => {
    console.log(res);
})