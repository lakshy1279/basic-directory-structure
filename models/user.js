//Mongoose models allow us to access data from MongoDB in an object-oriented fashion.
const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const Avatr_Path=path.join('/uploads/users/avatrs');
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
    },
    avatar:{
        type:String
    },
    friend:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friendship'
    }]
},{
    //The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
    timestamps:true
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',Avatr_Path));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static methods
userSchema.statics.uploadedAvatar=multer({ storage: storage }).single('avatar');
userSchema.statics.avatarpath=Avatr_Path;
//The last line mongoose.model('User', UserSchema); registers our schema with mongoose. Our user model can then be accessed anywhere in our application by calling mongoose.model('User').
const User=mongoose.model('User',userSchema);
module.exports=User;