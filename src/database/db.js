import mongoose from "mongoose";
export async function connectDB(url)
{
    return mongoose.connect(url).then(()=> console.log("Connected"))
    .catch((err)=> console.log("Not Connected",err));
}