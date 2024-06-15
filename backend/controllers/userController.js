const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Sprawdź, czy użytkownik istnieje
    const userNameExists = await User.findOne({ username }).exec();
    const emailExists = await User.findOne({ email }).exec();
    if (userNameExists) {
      return res.json({ error: "Username is already taken" });
    }
    if (emailExists) {
      return res.json({ error: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Zapisz użytkownika w bazie danych
    await user.save();

    res.json({
      success: "Account successfully created!",
    });
  } catch (error) {
    res.json({
      error: "User registration and activation failed",
      details: error.message,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.json({ message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const payload = {
        id: user._id,
        username: user.username,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.json({ token });
    } else {
      return res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    return res.json({ error: "Login failed", details: error.message });
  }
};

module.exports = {
  register,
  login,
};
