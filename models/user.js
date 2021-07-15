const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');
const crypto = require ('crypto');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
//Create Schema
const UserSchema = new Schema({
  userId: {
    type: Number
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Login: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type :String,
    required: false

  },
  resetPasswordExpires: {
    type:Date,
    required :false
  }

  
  
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
      id: this._id,
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
  };
}
UserSchema.methods.generatePasswordReset = function(){
  this.resetPasswordToken= crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires =Date.now()+3600000; //expires in an hour
  console.log("password generates");
};
module.exports = user = mongoose.model("Users", UserSchema);


