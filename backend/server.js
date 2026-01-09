const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const userRoute = require("./routes/userRoute")

const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())

app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))

app.use(cookieParser())

app.use("/",userRoute)


const CallDB = () => {
    try{
        mongoose.connect(process.env.DATABASE_URL)
        app.listen(process.env.PORT , ()=>{
            console.log("The server ready for take off");

        })
        
        

    }
    catch(error){
        console.log(error);
        
    }
}

CallDB()


