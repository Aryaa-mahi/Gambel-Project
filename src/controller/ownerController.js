import { Owner } from "../models/ownerModel.js";
import { oid_generator } from "../util/idGenerator.js";

export const OwnerRegister= async(req,res)=>{
    const {name,password,email} = req.body;
    if(!name && !password && !email){
       res.send("All input requires.");
    }
    const newUser = await Owner.insertOne({
        "name":name,
        "password":password,
        "email": email,
        "O_id": oid_generator(),
        "verifyed": true,
        "coin": 100,
    })
    res.send("Owner Created");
}
export const ownerLogin = async(req,res)=>{
    const {email,password} = req.body;
    if (!email && !password) {
        res.send("All input requires.");
    }

    const ExistingOwner = await Owner.findOne({
        "email": email,
        "password": password,
    })
    if(!ExistingOwner){
        res.send("Owner not found");
    }
    res.send("Owner login successful")
}
