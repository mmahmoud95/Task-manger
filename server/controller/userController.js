const User = require("../models/user");
const { setCookie } = require("../utils/generateToken");
const userValidation = require("../utils/validation");
const bycrypt = require("bcryptjs");


const register = async (req, res) => {
  const { name, email, password } = req.body;
  const result = userValidation.safeParse(req.body)
  if (!result.success) {
    const error = result.error.errors.map(err => ({
      path: err.path[0],
      message: err.message
    }))
    return res.status(400).json({
      error: error[0].message
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password: bycrypt.hashSync(password, 10)
  });

  res.status(200).json({ message: "User registered successfully", data: user });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  const isPasswordValid = await bycrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = setCookie(res, user._id);
  // console.log(token)
  res.status(200).json({ message: "User logged in successfully", data: user });

}

const logOut = async (req, res) => {
  res.cookie('token', '', {  // تعيين القيمة كقيمة فارغة
    httpOnly: true,
    expires: new Date(0),  // تحديد وقت سابق لحذف الكوكي
    secure: true,
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logOut }