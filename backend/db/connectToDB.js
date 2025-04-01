const mongoose = require("mongoose");

const ConnectToDB = () => {
    mongoose.connect(`${process.env.DB_CONNECTION}/MERN-Commerce`).then(() => {
        console.log("DataBase Connceted To Your Application");
    }).catch((err) => {
        console.log("Error In Connecting To DataBase" , err);
})
};

module.exports = ConnectToDB;