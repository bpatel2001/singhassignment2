const express=require("express")
const app=express()
const path=require("path")
const coll=require("./database")
const profs=require("./profiles")
const bcrypt = require('bcrypt')

app.use(express.json())
app.set("view engine","ejs")

app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/profmgmt",(req,res)=>{
    res.render("profmgmt")
})

app.post("/register",async (req,res)=>{
    const encryptedpass = await bcrypt.hash(req.body.password, 10)
    info={
        username: req.body.username,
        password: encryptedpass
    }
    password = await req.body.password
    confirmpassword = await req.body.confirmpassword

    if(password!=confirmpassword){
        res.send("passwords not matching")
    } else{
        await coll.insertMany([info]) 
        res.render("login")
    }
    console.log(info)
})

app.post("/login",async (req,res)=>{
    try{
        const check = await coll.findOne({username:req.body.username})
        if(await bcrypt.compare(req.body.password, check.password)){
            res.render("index")
        }
        else{
            res.send("wrong password")
        }
    } catch {
        res.send("wrong details")
    }
})

app.post("/profmgmt",async (req,res)=>{
    userinfo={
        fullname: req.body.fullname,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        states: req.body.states,
        zip: req.body.zip
    }
    await profs.insertMany([userinfo]) 
    res.render("index")
})

app.listen(3000)