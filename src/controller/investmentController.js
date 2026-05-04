import { Invest } from "../models/investmentModel.js";
import { User } from "../models/userModel.js";
import { uid_generator } from "../util/idGenerator.js";

export const Investment = async (req,res) =>{
    const {userID,Amount,duration} = req.body;
    if (Amount<0 && !userID && !duration) {
        res.send("Invalid Credentials"); 
        return;
    }
    
   const findUser = await User.findOne({
        "U_id": userID,
   }); 
   if(!findUser){
    res.send("User not found."); 
    return;
   }
   
const userBalance = findUser.coin;
  console.log(userBalance);
    if (userBalance<Amount) {
        console.log("Insufficeint Balance");  
    }

    const currentBal = userBalance- Amount;
    const updateUserBal = await User.findOneAndUpdate({
        "U_id": userID,
    },
{
    "coin": currentBal,
});

    const int = (Amount*10)/100  //int= interest
    const fixedDeposite = Amount + int ;
   const  timeStamp = duration*10000;
   setTimeout(async() => {

  const updtUserBal = await User.findByIdAndUpdate(
{
    "U_id":userID,
},{
    "coin":fixedDeposite ,
  },)
},timeStamp);
    res.send(`Amount ${Amount} deducted from user ${userID} remaining balance is ${currentBal}.
        User investment will get matured in ${duration}minitues and get amount ${fixedDeposite}.`);
    
}