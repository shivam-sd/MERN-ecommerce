const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;
const RegisterRouter = require("./routes/register.route");
const LoginRouter = require("./routes/login.route");
const userDetails = require("./routes/userDetail.route");
const userLogout = require("./routes/logout.route");
const ConnectToDB = require("./db/connectToDB");
const sellerRegisterController = require("./controllers/sellerRegister.controller");
const sellerLoginController = require("./controllers/sellerLogin.controller");
const sellerDetailsController = require("./controllers/sellerDetails.controller");
const sellerLogoutController = require("./controllers/sellerLogout.Controller");
ConnectToDB();


app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

//for User middleware
app.use("/users" , RegisterRouter);
app.use("/users" , LoginRouter);
app.use("/users" , userDetails);
app.use("/users", userLogout);

//for seller Middelware
app.use("/seller", sellerRegisterController);
app.use("/seller" , sellerLoginController);
app.use("/seller", sellerDetailsController);
app.use("/seller", sellerLogoutController);



app.listen(port , () => {
    console.log("Server Run On PORT " + process.env.PORT);
});