import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "src/uploads/";
    if (file.fieldname === "thumbnail") {
      uploadPath += "thumbnail";
    } else if (file.fieldname === "cover") {
      uploadPath += "cover";
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const ALLOWED_FILE_TYPES = /jpeg|jpg|png|webp/;

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const mimetype = ALLOWED_FILE_TYPES.test(file.mimetype);
  const extname = ALLOWED_FILE_TYPES.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Error: Only images with file types jpeg, jpg, png, and webp are allowed"
      )
    );
  }
};

const FILE_SIZE_LIMIT = 1024 * 1024 * 5;

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);

export { uploadMiddleware };
