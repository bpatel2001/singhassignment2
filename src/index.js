const express=require("express")
const app=express()
const path=require("path")
const coll=require("./database")

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

app.post("/register",async (req,res)=>{
    info={
        username: req.body.username,
        password: req.body.password
    }
    password = await req.body.password
    confirmpassword = await req.body.confirmpassword

    if(password!=confirmpassword){
        res.send("passwords not matching")
    } else{
        await coll.insertMany([info]) 
        res.render("login")
    }
})

app.post("/login",async (req,res)=>{
    try{
        const check = await coll.findOne({username:req.body.username})
        if(check.password===req.body.password){
            res.render("index")
        }
        else{
            res.send("wrong password")
        }
    } catch {
        res.send("wrong details")
    }
})

app.listen(3000)