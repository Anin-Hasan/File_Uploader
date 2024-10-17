const { PrismaClient } = require("@prisma/client");
const { File, Folder } = require("../utils/prisma");

const prisma = new PrismaClient();

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const userId = req.user.id;

  try {
    const file = await File.create({
      data: {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        userId,
      },
    });
    res.redirect("/files/upload");
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { message: "Error uploading file" });
  }
};
