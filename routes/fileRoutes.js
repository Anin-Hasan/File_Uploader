const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const uniqueSuffix = `${year}-${month}-${day}-${hours}-${minutes}`;
    const originalName = file.originalname.replace(/\s+/g, "_"); // Replace spaces with underscores
    cb(null, `${uniqueSuffix}-${originalName}`);
  },
});
const upload = multer({ storage: storage });

router.get("/upload", isAuth, (req, res) => {
  res.render("upload");
});

router.post(
  "/upload",
  isAuth,
  upload.single("file"),
  fileController.uploadFile
);

router.get("/folders", isAuth, folderController.getFolders);
router.post("/folders", isAuth, folderController.createFolder);
router.get("/folders/:id", isAuth, folderController.getFolder);
router.put("/folders/:id", isAuth, folderController.updateFolder);
router.delete("/folders/:id", isAuth, folderController.deleteFolder);

router.post(
  "/folders/:folderId/upload",
  isAuth,
  upload.single("file"),
  fileController.uploadFileToFolder
);

router.delete("/files/:id", isAuth, fileController.deleteFile);
router.get("/download/:id", isAuth, fileController.downloadFile);

module.exports = router;
