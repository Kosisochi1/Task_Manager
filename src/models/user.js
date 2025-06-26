const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  // condition to hash password
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
UserSchema.methods.comparePassword = async function (password) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  return isValidPassword;
};

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
