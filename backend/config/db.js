import mongoose from "mongoose";

export const connectDB =async ()=>{
    await mongoose.connect('mongodb://Nirwan:user1234@ac-twvlzie-shard-00-00.pzflgqq.mongodb.net:27017,ac-twvlzie-shard-00-01.pzflgqq.mongodb.net:27017,ac-twvlzie-shard-00-02.pzflgqq.mongodb.net:27017/FusionMart?ssl=true&replicaSet=atlas-jfpna9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"))
}