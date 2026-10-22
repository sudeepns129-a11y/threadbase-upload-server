import multer from "multer";
import path from "node:path";

export class InvalidFileTypeError extends Error {
  constructor() {
    super("Only JPEG, PNG, WebP, and GIF images are allowed");
    this.name = "InvalidFileTypeError";
  }
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    callback(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(new InvalidFileTypeError());
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
