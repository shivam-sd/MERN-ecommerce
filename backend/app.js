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
const sellerRegisterRoute = require("./routes/sellerRegister.route");
const sellerLoginRoute = require("./routes/sellerLogin.route");
const sellerDetailsRoute = require("./routes/sellerDetails.Route");
const sellerLogoutRoute = require("./routes/sellerLogout.Route");
const productRoute = require("./routes/product.route");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
ConnectToDB();


app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
    createParentPath:true
}))

// Cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

//for User middleware
app.use("/users" , RegisterRouter);
app.use("/users" , LoginRouter);
app.use("/users" , userDetails);
app.use("/users", userLogout);

//for seller Middelware
app.use("/seller", sellerRegisterRoute);
app.use("/seller" , sellerLoginRoute);
app.use("/seller", sellerDetailsRoute);
app.use("/seller", sellerLogoutRoute);

app.use("/products", productRoute);


app.listen(port , () => {
    console.log("Server Run On PORT " + process.env.PORT);
});