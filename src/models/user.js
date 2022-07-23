const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');
const {Schema}=mongoose;

const userSchema=new Schema({
    email:String,
    password:String,
});

userSchema.methods.encryptPassword=(password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}//con bcrypt se encripta la contraseña a traves del metodo genSaltSync

userSchema.methods.comparePassword=function(password){
return bcrypt.comparePassword(pasword,this.password);
}

module.exports=mongoose.model('user', userSchema);//SE VA A USAR ESTE ESQUEMA Y GUARDARLO EN UNA COLECCION LLAMADA USERS