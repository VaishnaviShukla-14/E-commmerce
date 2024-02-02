const User = require("../models/user.models");
const genrateToken = require("../helpers/generatetoken");

//signup
const addUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const newUser = new User({ name, email, password, phone, address });
    await newUser.save();
    res.status(200).json({ mess: "User Save SuccessFully", newUser });
  } catch (error) {
    res.status(500).json({ mess: "Error To save the User", error });
  }
};
//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const loginDeatial = await User.findOne({ email });
  if (!loginDeatial) {
  return   res.status(400).json({ mess: "eamil is invalid" });
  }
  if (loginDeatial.password != password) {
   return  res.status(400).json({ mess: "password is invalid" });
  } else {
    const Token = genrateToken(loginDeatial);
   return res.status(200).json({ mess: "login successfully", Token, loginDeatial });
  }
};

module.exports = { addUser, loginUser };
