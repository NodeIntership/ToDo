const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const routes = require("./Routes/routes");

app.use("/", routes);

const { port, dbUri } = require("./Config/variables")

mongoose.connect(dbUri, (e) => {
    if(e) {
        return console.log(e);
    }
    app.listen(port, ()=>{
        console.log("App running in port " + port);
    })
});