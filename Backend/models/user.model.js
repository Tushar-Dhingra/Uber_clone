const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
});


userSchema.methods.genrateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // Token expires in 24 hour
  );
  return token;
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// };

const user = mongoose.model("user", userSchema);

module.exports = user;
