const mongoose= require('mongoose')


const UserSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    password:String,
    email:String
},{
    versionKey:false
})

const User = mongoose.model('user',UserSchema)
module.exports={
    User
}








