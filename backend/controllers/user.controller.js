import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { User } from '../models/user.model.js';
import { userProfile } from "../models/userprofile.model.js";

import jwt from "jsonwebtoken";

export const logoutAction = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure : true,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ message: "Error during logout", error: err.message });
  }
};

export const signInAction = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user)
      return response.status(401).json({ error: "Unauthorized user | Email ID not found" });

    if (user.role === "user" && !user.verified)
      return response.status(401).json({ error: "Not verified user | Please verify your account via OTP first" });

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch)
      return response.status(401).json({ error: "Unauthorized user | Invalid password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    console.log("JWT_SECRET in signIn:", process.env.JWT_SECRET);




    response.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });



    user.password = undefined;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    return response.status(200).json({ message: "Sign In Success", user });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export const signUpAction = async (request, response, next) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty()) {
      return response.status(401).json({
        error: "Bad request | Invalid data",
        errorDetails: error.array()
      });
    }

    let { password, email, name } = request.body;

    let saltKey = bcrypt.genSaltSync(12);
    password = bcrypt.hashSync(password, saltKey);
    request.body.password = password;

    request.body.role = 'user';
    request.body.verified = false;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 mins

    request.body.otp = otp;
    request.body.otpExpiresAt = otpExpiresAt;

    const newUser = await User.create(request.body);

    const emailSent = await sendOTP(email, otp);

    if (!emailSent) {
      await User.deleteOne({ _id: newUser._id });
      return response.status(500).json({ error: "Failed to send OTP email, try again" });
    }

    return response.status(201).json({
      message: "User created. OTP sent to email",
      userDetail: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

const sendOTP = (toEmail, otp) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.GMAIL_ID,
      to: toEmail,
      subject: 'OTP Verification - Hobby Buddy',
      html: `
        <h3>Your OTP is: <span style="color:blue;">${otp}</span></h3>
        <p>This OTP is valid for 2 minutes only.</p>
        <p>If you did not request this, please ignore this email.</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.verified) return res.status(400).json({ message: "Already verified" });

  const currentTime = new Date();
  if (user.otpExpiresAt < currentTime) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  user.verified = true;
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  res.status(200).json({ message: "User verified successfully" });
};
export const checkAuth = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ isLoggedIn: false });
    }

    return res.status(200).json({ isLoggedIn: true });
  } catch (err) {
    console.error("Auth Check Error:", err);
    return res.status(500).json({ isLoggedIn: false });
  }
};

export const getAllUsersExpertItself = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const users = await userProfile.find(
      { userId: { $ne: currentUserId } }, // ❗️ use userId field, not _id if that's your custom field
      "-password"
    );

    const updatedUsers = users.map(user => {
      const profilePath = user.profilepicture
        ? `${req.protocol}://${req.get('host')}${user.profilepicture}`
        : `${req.protocol}://${req.get('host')}/uploads/default-user.png`;

      return {
        ...user._doc,
        profile: profilePath,
      };
    });

    res.status(200).json({ message: "Other users fetched successfully", users: updatedUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const googleSignInAction = async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: "",
        role: "user",
        verified: true,
        googleSignIn: true,
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    return res.status(200).json({
      message: "Google Sign-in Success",
      user,
    });
  } catch (err) {
    console.error("Google Sign-in Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const forgotPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "No user registered with this email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 mins

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    const emailSent = await sendOTP(email, otp);
    if (!emailSent) return res.status(500).json({ error: "Failed to send OTP" });

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const verifyForgotOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const currentTime = new Date();
  if (user.otpExpiresAt < currentTime)
    return res.status(400).json({ message: "OTP expired" });

  if (user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  user.otp = null;
  user.otpExpiresAt = null;
  user.allowPasswordReset = true;
  await user.save();

  return res.status(200).json({ message: "OTP verified. You can now reset password." });
};
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.allowPasswordReset || user.allowPasswordReset === false) {
    return res.status(403).json({ message: "OTP verification required before resetting password" });
  }

  const salt = bcrypt.genSaltSync(12);
  user.password = bcrypt.hashSync(newPassword, salt);
  user.allowPasswordReset = false;

  await user.save();

  return res.status(200).json({ message: "Password reset successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error("❌ Error fetching current user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
