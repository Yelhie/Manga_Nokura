import multer from "multer";
import path from "path";

// Défini où et comment les fichiers seront stockés et renommés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "src/uploads/";
    if (file.fieldname === "thumbnail") {
      uploadPath += "thumbnail";
    } else if (file.fieldname === "cover") {
      uploadPath += "cover";
    }
    cb(null, uploadPath); // Dossier où les fichiers seront stockés dans le projet
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomme le fichier avec un timestamp
  },
});

// Défini les types de fichiers acceptés et la gestion des erreurs de type de fichier
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
        "Error: Seul les fichiers aux formats jpeg, jpg, png et webp sont autorisées."
      )
    );
  }
};

// Défini la taille maximale de fichier autorisé lors de l'upload
const FILE_SIZE_LIMIT = 1024 * 1024 * 5; // 5MB

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]); // Permet l'upload de plusieurs fichiers avec des champs différents

export { uploadMiddleware };
