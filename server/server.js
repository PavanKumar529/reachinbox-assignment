const express = require("express")
const dotenv = require("dotenv")
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");

dotenv.config()

// Database Connection
dbConnect();


const hostName = process.env.HOST_NAME || "127.0.0.5"
const PORT = process.env.PORT || 5000

const app = express()


// middleware 
app.use(express.json());
app.use(cookieParser())


// Routers
app.use("/api/users", userRouter)



// Demo API
app.get("/", (req, res) => {
    res.send("Hello, I am API")
})


app.listen(PORT, hostName, () => {
    console.log(`Server running at http://${hostName}:${PORT}`);
})

