import multer from "multer";
import path from "path";
import fs from "fs";

const makeFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

makeFolder("uploads/photos");
makeFolder("uploads/videos");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      cb(null, "uploads/photos");
    } else if ([".mp4"].includes(ext)) {
      cb(null, "uploads/videos");
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");

    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedImage = [".jpg", ".jpeg", ".png"];
  const allowedVideo = [".mp4"];

  if (allowedImage.includes(ext) || allowedVideo.includes(ext)) {
    cb(null, true);
  } else {

    cb(new Error("Only .jpg, .jpeg, .png, or .mp4 files are allowed"), false);

  }
};

const upload = multer({ storage, fileFilter });

export const uploadSingleMedia = upload.single("media");

export const uploadMedia = upload.fields([
  { name: "photos", maxCount: 5 },
  { name: "videos", maxCount: 2 }
]);
export {upload};