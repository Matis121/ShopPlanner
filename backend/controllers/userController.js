const { User, Group, GroupUser } = require("../models");
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
const confirmGroupInvitation = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    const group = await Group.findOne({ _id: groupId });

    if (!user) {
      return res.status(404).json({ error: "User not found in database" });
    }
    if (!group) {
      return res.status(404).json({ error: "Group not found in database" });
    }
    if (!user.groupInvitations.includes(groupId.toString())) {
      return res
        .status(400)
        .json({ error: "Group invitation not found for this user" });
    }
    const groupUser = group.users.find(
      groupUser =>
        groupUser.id === userId.toString() && groupUser.status === "invited"
    );
    if (!groupUser) {
      return res
        .status(400)
        .json({ error: "User was not invited to the group" });
    }
    groupUser.status = "active";
    await group.save();

    user.groupInvitations = user.groupInvitations.filter(
      invitation => invitation.toString() !== groupId
    );
    user.groups.push(groupId);
    await user.save();
    return res
      .status(200)
      .json({ message: "Invitation confirmed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send invitation" });
  }
};
const rejectGroupInvitation = async (req, res) => {
  const { userId, groupId } = req.body;
  try {
    const user = await User.findById(userId);
    const group = await Group.findOne({ _id: groupId });

    if (!user) {
      return res.status(404).json({ error: "User not found in database" });
    }
    if (!group) {
      return res.status(404).json({ error: "Group not found in database" });
    }
    if (!user.groupInvitations.includes(groupId.toString())) {
      return res
        .status(400)
        .json({ error: "Group invitation not found for this user" });
    }

    // Remove the invitation from the user's groupInvitations array
    user.groupInvitations = user.groupInvitations.filter(
      invitation => invitation.toString() !== groupId
    );
    await user.save();

    // Remove the user from the group's users array if their status is "invited"
    group.users = group.users.filter(
      groupUser =>
        groupUser.id !== userId.toString() || groupUser.status !== "invited"
    );
    await group.save();

    return res.status(200).json({ message: "Invitation removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to remove invitation" });
  }
};

module.exports = {
  register,
  login,
  confirmGroupInvitation,
  rejectGroupInvitation,
};
