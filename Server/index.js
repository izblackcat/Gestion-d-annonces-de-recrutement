const express = require("express")
const app = express()
const mongoose = require("mongoose")

require("dotenv").config()


app.get("/",(request, response) => {
    response.send("WELCOME TO THE RECRUITER SITE")
})

const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 5000



mongoose.connect(connection_string)
.then(() => console.log("Connection successful OK"))
.catch((err)=> console.error("Connection Failed : ",err.message))

app.listen(port, () =>{
    console.log(`Server running on port ${port} ... `)
})