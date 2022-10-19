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

const { createRow, readeList, readeOne, changeRow, deleteRow } = require("./Controllers/todo");

app.post("/create", createRow);
app.get("/readAll", readeList);
app.get("/readOne", readeOne);
app.patch("/change", changeRow);
app.delete("/remove", deleteRow)

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