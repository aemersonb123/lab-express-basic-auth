const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'Username already taken.'],
    required: [true, 'Username is required.'],
    trim: true,
  },
  passwordHash :{
    type: String,
    required: [true, 'Password is required.']
  }
});

const User = model("User", userSchema);

module.exports = User;
