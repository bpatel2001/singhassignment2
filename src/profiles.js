const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/project")

const schema=new mongoose.Schema({
    fullname:{
        type:String, 
        required: true
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:true
    },
    states:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    }

})

const coll = new mongoose.model("profilemanagement",schema)

module.exports=coll