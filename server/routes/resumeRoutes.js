const express = require("express");
const multer = require("multer");
const {
  uploadAndAnalyzeResume,
  getAllAnalyses,
} = require("../controllers/resumeController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), uploadAndAnalyzeResume);
router.get("/history", getAllAnalyses);

module.exports = router;