import { User } from "../models/userModel.js";
import { instance } from "../util/paymentHandler.js";
import { Payment } from "../models/paymentModel.js";
export const Payments = async(req,res)=>{
    const{amount,name,email,contact,notes,description,uid}= req.body; //input 
 if (amount<0 && !name && !email && !contact && !contact.length===10 && !uid ) { // validate
  res.send("Invalid");
  return;
 }
 
 const findUser =await User.findOne({
  "U_id": uid,
 })

  if (!findUser) {
  res.send("User not found");
   return;
 }

   try{ const options = { //logic
  amount: amount,  // Amount is in currency subunits. 
  currency: "INR",
  receipt: "order_rcptid_11"
};
 const order_id =await instance.orders.create(options)
 
 const link =await instance.paymentLink.create({
  amount: amount,
  currency: "INR", 
  description: description|| "no description provided by user",
  customer: {
    name: name,
    email: email,
    contact: `+91 ${contact}`
  },
  notes: {
    policy_name: notes || "no note"
  },
  callback_url: "https://www.awwwards.com/",
  callback_method: "get"
})

await Payment.insertOne({
  "U_id": uid,
  "Amount":amount,
  "status": true,
  "P_id": link.id,
  "coin_granted": 100,

})
res.send(link); //reponse

} catch (error) {
    console.log("error",error);
    
}
}