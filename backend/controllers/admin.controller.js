import { userProfile } from "../models/userprofile.model.js";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized: Not an admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax"
    });

    res.status(200).json({
      message: "Admin login successful",
      adminId: admin._id,
      role: admin.role
    });

  } catch (error) {
    console.error("Admin Signin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await userProfile.find({}, "-password");

    const updatedUsers = users.map(user => {
      const profilePath = user.profilepicture
        ? `${req.protocol}://${req.get('host')}${user.profilepicture}`
        : `${req.protocol}://${req.get('host')}/uploads/default-user.png`;

      return {
        ...user._doc,
        profile: profilePath,
      };
    });

    res.status(200).json({ message: "All users fetched successfully", users: updatedUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};
