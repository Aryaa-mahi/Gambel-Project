
import { User } from "../models/userModel.js";
import { uid_generator } from "../util/idGenerator.js";

export const userRegister= async(req,res)=>{
    const {name,password,email} = req.body;
    if(!name && !password && !email){
       res.send("All input requires.");
    }
    const newUser = await User.insertOne({
        "name":name,
        "password":password,
        "email": email,
        "U_id": uid_generator(),
        "verifyed": true,
        "coin": 100,
    })
    res.send("User Created");
}
export const userLogin = async(req,res)=>{
    const {email,password} = req.body;
    if (!email && !password) {
        res.send("All input requires.");
    }

    const ExistingUser = await User.findOne({
        "email": email,
        "password": password,
    })
    if(!ExistingUser){
        res.send("User not found");
    }
    res.send("User login successful")
}
