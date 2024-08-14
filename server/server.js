const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const hostName = process.env.HOST_NAME || "127.0.0.5"
const PORT = process.env.PORT || 5000

const app = express()


// Demo API
app.get("/", (req, res) => {
    res.send("Hello, I am API")
})

app.listen(PORT, hostName, () => {
    console.log(`Server running at http://${hostName}:${PORT}`);
})

