const mongoose = require("mongoose");
const User = require("./models/userModel");
require("dotenv").config()
const cors = require("cors")

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongodb is connected")
})

const io = require("socket.io")((process.env.PORT || 8900),{
    cors : {
        origin:true
    }
}); 

let seller;
let data;

const addUser = async (userId, socketId) => {
     const user=await User.findById(userId)
     seller = {userId, socketId, user}

}

const findOrder = async (i,userId) => {
     const usr=await User.findById(userId)
     const order=usr.incomingOrders[i];
     data = order


}


io.on("connection",(socket)=>{
    console.log("user is connected")
    io.emit("welcome","this is socket server")
    //take userId and socketId from user

    socket.on("changeState", async ({i,userId})=>{
        if(userId.match(/^[0-9a-fA-F]{24}$/)){await findOrder(i,userId)
        io.emit("changes",data)}
    })


    socket.on("addUser", async (userId) =>{
        if(userId.match(/^[0-9a-fA-F]{24}$/)){await addUser(userId,socket.id);
        io.emit("getUsers",seller)}
    });

    // socket.on("disconnect",()=>{
    //     console.log("a user disconnected");
    //     removeUser(socket.id)
    //     io.emit("getUsers",users)
    // })
}) 