//Importing Databases
import { Gambel } from "../models/gambelModel.js";
import { RandomNum,slotMachine } from "../util/rng.js"; //function
import { User } from "../models/userModel.js";
import { Owner } from "../models/ownerModel.js";

export const Gambeling = async (req, res) => {
  const { Amount, uid } = req.body;
  if (Amount > 0 && !uid) {
    res.send("Failed");
  }

  const user = await User.findOne({
    U_id: uid,
  });
  const userBalance = user.coin;
  if (userBalance <= Amount) {
    res.send("Insufficient balance");
    return;
  }

  const currentBal = user.coin - Amount;
  const updateUserBal = await User.findOneAndUpdate(
    {
      U_id: uid,
    },
    {
      coin: currentBal,
    },
  );

  const status = RandomNum();
  if (status) {
    const WinningAmount = Amount * 2;
    const updateUserBal = await User.findOneAndUpdate(
      {
        U_id: uid,
      },
      {
        coin: WinningAmount,
      },
    );
    res.send(`${user.name} won amount  ${WinningAmount}`);
  } else {
    const LoosingAmount = Amount / 2;
    const ownerId = process.env.OWNER_UID;
    const OwnerUpdate = await Owner.findOneAndUpdate(
      {
        O_id: ownerId,
      },
      {
        $inc: { coin: LoosingAmount },
      },
    );

    res.send(`${user.name} better luck next time 🫡`);
  }
};

export const Slot = async (req,res) =>{
    const status = slotMachine()
    console.log(status);
    
    res.send(status);
}
