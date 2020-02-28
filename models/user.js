//Mongoose models allow us to access data from MongoDB in an object-oriented fashion.
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
{
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    }
},{
    //The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
    timestamps:true
});
//The last line mongoose.model('User', UserSchema); registers our schema with mongoose. Our user model can then be accessed anywhere in our application by calling mongoose.model('User').
const User=mongoose.model('User',userSchema);
module.exports=User;