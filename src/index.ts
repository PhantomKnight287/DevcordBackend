const express = require('express')
const app = express()
app.get("/",async(req,res)=>{
    res.status(200).send({message:"Hello World"})
})


app.listen(process.env.PORT || 4000,()=>{
    console.log("Server Started")
})
