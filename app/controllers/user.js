const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: passwordHashed,
    });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid Password!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION, 
    });
    return res.status(200).json({ token: token, user: user});
  }
  catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred while logging in the User.",
    });
  }
};
