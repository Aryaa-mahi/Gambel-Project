//Importing Databases
import { Gambel } from "../models/gambelModel.js";
import { RandomNum,slotMachine } from "../util/rng.js"; //function
import { User } from "../models/userModel.js";
import { Owner } from "../models/ownerModel.js";
import { gid_generator } from "../util/idGenerator.js";
import { number } from "zod";

const ownerId = process.env.OWNER_UID;
const gambelId = gid_generator();

export const Gambeling = async (req, res) => {
  //INPUT
  const { Amount, uid } = req.body;
  //VALIDATION
  if (Amount > 0 && !uid) {
    res.send("Failed");
  }

//DATABASE CALL TO VERIFY THE USER
  const user = await User.findOne({
    U_id: uid,
  });
  //VERIFYING AND VALIDATING USER BALANCE
  const userBalance = user.coin;
  if (userBalance < Amount) {
    res.send("Insufficient balance");
    return;
  }
  //DB CALLING TO UPDATE USER BALANCE
  const currentBal = user.coin - Amount;
  const updateUserBal = await User.findOneAndUpdate(
    {
      U_id: uid,
    },
    {
      coin: currentBal,
    },
  );
// TOSSING RANDOM NUMBER
  const status = RandomNum();
  //VERIFYING USER WIN OR LOOSE
  
  if (status) { //-> WIN CONDITION
    const WinningAmount = Amount * 2;  //-> DOUBLING THE USER AMOUNT AND UPDATING IT IN USER BALANCE    
    const updateUserBal = await User.findOneAndUpdate(
      {
        U_id: uid,
      },
      {
        $inc : {coin: WinningAmount}
      },
    );
    //UPDATING GAMBEL DB
    await Gambel.insertOne({"owner":ownerId,
      "Amount":Amount,
      "U_id": uid,
      "G_id":gambelId,
      "status": "win",
      "method":"Gambel",
    });
    
    res.send(`${user.name} won amount  ${WinningAmount}`);
  } else { //-> LOOSING CONDITION
    const LoosingAmount = Amount / 2; //-> DEDUCTING THE AMOUNT AND UPDATING IN OWNER BALANCE
    const OwnerUpdate = await Owner.findOneAndUpdate(
      {
        O_id: ownerId,
      },
      {
        $inc: { coin: LoosingAmount },
      },
    );
// UPDATING GAMBEL DB
     await Gambel.insertOne({"owner":ownerId,
      "Amount":Amount,
      "U_id": uid,
      "G_id":gambelId,
      "status": "lost",
      "method":"Gambel",
    });
    res.send(`${user.name} better luck next time 🫡`);
  }
};

export const Slot = async (req,res) =>{
    //INPUT 
    const{uid,Amount} = req.body;
    //VALIDATION
    if (Amount<=0 && !uid) {
      console.log("Invalid amount or user.");
    }
  //DB CALL TO UPDATE 
  const user = await User.findOne({
    "U_id": uid,
  });

  //VERIFY AND VALIDATING
  const userBalance = user.coin;
  if (userBalance< Amount) {

    res.send("Insufficent balance");
    return;
  }
  
  //DB CALLING UPDATE USER BALANCE
  const currentBal= user.coin-Amount;
  const updateUserBal = await User.findOneAndUpdate({
    "U_id": uid,
  },
  {
    "coin": currentBal,
  });
  //TOSSING RANDOM NUMBER
  const status = slotMachine();
  //VALIDATING AND VERIFYING
  if (status.chance) { 
    const WinningAmount =Amount * 2 * status.bonous; //-> WINNING CONDITION
const updateUserBal = await  User.findOneAndUpdate({
  "U_id": uid,
},
{
$inc :{coin : WinningAmount},  // $inc: {coin:LoosingAmount} 
});
// Updating slot db
await Gambel.insertOne({
  "owner":ownerId,
  "G_id": gambelId,
  "Amount":Amount,
  "status":"win",
  "method": "Slot",
  "U_id" : uid,

});
    res.send(`${user.name} won amount  ${WinningAmount}`);

}else{
  const LoosingAmount = Amount;
  const OwnerUpdate = await Owner.findOneAndUpdate({
    "O_id": ownerId,
  },
{
  $inc: {coin:LoosingAmount} 
});
    
    //UPDATING GAMBEL TABLE
    await Gambel.insertOne({
      "owner":ownerId,
      "G_id": gambelId,
      "Amount":Amount,
      "status": "lost",
      "method": "slot",
      "U_id": uid,
    });
        res.send(`${user.name} lost amount  ${LoosingAmount}`);
}}
    

