import express from "express";
import multer from "multer";
import upload, { InvalidFileTypeError } from "../config/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const uploadAvatar = upload.single("avatar");

function handleAvatarUpload(req, res, next) {
  uploadAvatar(req, res, error => {
    if (!error) {
      next();
      return;
    }
    if (error instanceof multer.MulterError || error instanceof InvalidFileTypeError) {
      res.status(400).json({ error: error.message });
      return;
    }
    next(error);
  });
}

router.post("/upload", verifyToken, handleAvatarUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  return res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
