const mongoose=require('mongoose');
const {Schema}=mongoose
const bcrypt=require('bcrypt');



const userData=new Schema({
    Username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        validate:{
            validator:(password)=>{
                return !password.includes('password')
            }
        }
    },
    Profile_Pic:{
        type:String,
    },
    pdf:
    [
        {
            type:Schema.Types.ObjectId,
            ref:'pdf'
        }
    ]
})


userData.pre('save',async function(next){
    const user=this;
    user.password=await bcrypt.hash(user.password,12);
    next()
})



const User=mongoose.model('User',userData)





module.exports=User