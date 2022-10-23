const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

const port = process.env.PORT;
const dbUri = process.env.DB_URL;

const todoRout = require("./Routes/todoRout");
const categoryRout = require("./Routes/categoryRout");

app.use("/todo", todoRout);
app.use("/category", categoryRout);

mongoose.connect(dbUri, {
  useNewUrlParser: true,
}, (e) => {
    if(e) {
        return console.log(e);
    }
    app.listen(port, ()=>{
        console.log("App running in port " + port);
    })
});