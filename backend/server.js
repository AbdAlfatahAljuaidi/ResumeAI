const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const userRoute = require("./routes/userRoute")
const resumeRoute = require("./routes/resumeRoute")
const complaintRoute = require("./routes/complaintRoute")

const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())

app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))

app.use(cookieParser())

app.use("/",userRoute)
app.use("/",resumeRoute)
app.use("/",complaintRoute)


const CallDB = () => {
    try{
        mongoose.connect(process.env.DATABASE_URL)
        app.listen(process.env.PORT , ()=>{
            console.log("The server ready for take offf");

        })
        
        

    }
    catch(error){
        console.log(error);
        
    }
}

CallDB()


