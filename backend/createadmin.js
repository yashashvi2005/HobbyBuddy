// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import { User } from "./models/user.model.js"; // path adjust karo

// ✅ Connect to DB
mongoose.connect(process.env.MONGO_URL2)
  .then(async () => {
    const hashedPassword = bcrypt.hashSync("123456", 12); // Change as needed

    const result = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      verified: true
    });

    console.log("✅ Admin created:", result);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error:", err);
  });