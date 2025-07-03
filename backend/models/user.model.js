import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  otp: { type: String },

  otpExpiresAt: { type: Date },

  allowPasswordReset: {
  type: Boolean,
  default: false,
},

  verified: {
    type: Boolean,
    default: false
  },
  watchedVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  }],
  totalPoints: {
    type: Number,
    default: 0
  }

});

export const User = mongoose.model("user", userSchema); 