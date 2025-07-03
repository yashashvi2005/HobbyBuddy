import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },
    city: {
      type: String,
      required: true
    },
    hobbies: {
      type: [String],
      required: true
    },
    profilepicture: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true 
  }
);

export const userProfile = mongoose.model("userprofile", userProfileSchema);
