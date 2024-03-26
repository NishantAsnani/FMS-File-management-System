const mongoose=require('mongoose');
const {Schema}=mongoose



const pdfSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const pdf=mongoose.model("pdf",pdfSchema)

module.exports=pdf