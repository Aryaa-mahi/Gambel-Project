import { Invest } from "../models/investmentModel.js";
import { User } from "../models/userModel.js";
import { iid_generator, uid_generator } from "../util/idGenerator.js";

const investId = iid_generator();
//function investment
export const Investment = async (req,res) =>{
    //input user
    const {userID,Amount,duration} = req.body;
    //validation
    if (Amount<0 && !userID && !duration) {
        res.send("Invalid Credentials"); 
        return;
    }
    //variable to store and find the user 
   const findUser = await User.findOne({
        "U_id": userID,
   }); 
   //validation 
   if(!findUser){
    res.send("User not found."); 
    return;
   }

   //variable to store the balance
const userBalance = findUser.coin;
  console.log(userBalance);
  //validation
    if (userBalance<Amount) {
        console.log("Insufficeint Balance");  
    }
//variable to store the current balance
    const currentBal = userBalance- Amount;
    //variable to update user database
    const updateUserBal = await User.findOneAndUpdate({
        "U_id": userID,
    },
{
    "coin": currentBal,
});

// variable to store intrest
    const int = (Amount*10)/100  //int= interest
    //variable to store fixed deposite
    const fixedDeposite = Amount + int ;
    //variable for duration given by user
   const  timeStamp = duration*10000;
    // updating the investment
    await Invest.insertOne({
        "Amount": Amount,
        "U_id":userID,
       "status": "locked",
       "Duration":`${duration} sec` ,
       "intrest":int ,
       "I_id": investId,
    });
   
   //function to perform the task in given time
   setTimeout(async() => {
    //updating user database
  const updtUserBal = await User.findOneAndUpdate(
{
    "U_id":userID,
},{
    "coin":fixedDeposite ,
  },
)
await Invest.findOneAndUpdate({
   "I_id": investId
},{
    "status": "Paid",
    
})
    console.log("Amount Credited",updateUserBal);
},timeStamp);
    res.send(`Amount ${Amount} deducted from user ${userID} remaining balance is ${currentBal}.
        User investment will get matured in ${duration}minitues and get amount ${fixedDeposite}.`);
    
}