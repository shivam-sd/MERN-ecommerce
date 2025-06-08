const UserModel = require("../models/user.model");

const AllUsersController = async(req,res) => {
    try{
        const users = await UserModel.find();
        if(!users || users.length === 0){
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({message:"All Users Fetched Successfully", users});
    }catch(err){
        console.error("Error fetching all users:", err.message);
        return res.status(500).json({ error: "Internal Server Error", error: err.message });
    }
}


module.exports = AllUsersController;