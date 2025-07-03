import { User } from "../models/user.model.js";
import { userProfile } from "../models/userprofile.model.js";

export const saveUserDetails = async (req, res) => {
  try {
    const { name, age, gender, city, hobbies } = req.body;
    const userId = req.userId; // from auth middleware


    if (!userId) {
      console.error(" userId is missing. Token might be invalid or expired.");
      return res.status(401).json({ error: "Unauthorized. Please log in again." });
    }

    const profilepicture = req.file
      ? `/uploads/photos/${req.file.filename}`
      : req.body.profilepicture || null;

    let hobbiesArray = [];
    if (Array.isArray(hobbies)) {
      hobbiesArray = hobbies;
    } else if (typeof hobbies === "string") {
      try {
        const parsed = JSON.parse(hobbies);
        hobbiesArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        hobbiesArray = [hobbies];
      }
    }

    console.log(" Normalized hobbiesArray:", hobbiesArray);

    if (
      !name?.trim() ||
      !age ||
      !gender?.trim() ||
      !city?.trim() ||
      hobbiesArray.length === 0 ||
      !profilepicture
    ) {
      return res.status(400).json({
        error: "All fields are required and hobbies must be an array.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existing = await userProfile.findOne({ userId });
    if (existing) {
      return res
        .status(409)
        .json({ error: "User details already submitted." });
    }

    const userInfo = await userProfile.create({
      userId,
      name,
      age,
      gender,
      city,
      hobbies: hobbiesArray,
      profilepicture,
    });

    console.log("Profile created successfully:", userInfo);

    return res.status(201).json({ message: "User details saved", userInfo });
  } catch (err) {
    console.error(" ERROR in saveUserDetails:", err);
    return res
      .status(500)
      .json({ error: "Server error while saving user details" });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, age, gender, city, hobbies } = req.body || {};

    const profilepicture = req.file
      ? `/uploads/photos/${req.file.filename}`
      : req.body?.profilepicture || undefined;

    console.log("Update Request Body:", req.body);
    console.log("Update File Info:", req.file || req.files);
    console.log("Received update data:", {
      userId,
      name,
      age,
      gender,
      city,
      hobbies,
      profilepicture,
    });

    let hobbiesArray = [];
    if (Array.isArray(hobbies)) {
      hobbiesArray = hobbies;
    } else if (typeof hobbies === "string") {
      try {
        const parsed = JSON.parse(hobbies);
        hobbiesArray = Array.isArray(parsed) ? parsed : [hobbies];
      } catch {
        hobbiesArray = [hobbies];
      }
    }

    console.log("Hobbies after processing:", hobbiesArray);

    if (
      !userId ||
      !name?.trim() ||
      !age ||
      !gender?.trim() ||
      !city?.trim() ||
      hobbiesArray.length === 0
    ) {
      return res.status(400).json({
        error: "All fields are required and hobbies must be an array.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingProfile = await userProfile.findOne({ userId });
    if (!existingProfile) {
      return res.status(404).json({ error: "User profile not found." });
    }

    const updateData = {
      name,
      age,
      gender,
      city,
      hobbies: hobbiesArray,
    };

    if (profilepicture) {
      updateData.profilepicture = profilepicture;
    }

    const updatedUser = await userProfile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    );

    return res.status(200).json({
      message: "User profile updated successfully",
      updatedUser,
    });

  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({
      error: "Server error while updating user details",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const profile = await userProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      profile,
      userDetails: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required from token" });
    }

    const deletedProfile = await userProfile.findOneAndDelete({ userId });

    if (!deletedProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    return res.status(200).json({ message: "User profile deleted successfully", deletedProfile });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error while deleting user profile" });
  }
};


