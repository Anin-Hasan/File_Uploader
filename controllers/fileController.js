const { PrismaClient } = require("@prisma/client");
const { File, Folder } = require("../utils/prisma");
const path = require("path");

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

exports.uploadFileToFolder = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const folderId = Number(req.params.folderId);
  const userId = req.user.id;
  try {
    const folder = await Folder.findFirst({
      where: {
        id: folderId,
        userId,
      },
    });
    if (!folder) {
      return res.status(404).send("No folderFound.");
    }

    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        userId,
        folderId,
      },
    });
    res.redirect(`/files/folders/${folderId}`);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .render("error", { message: "Error uploading file to folder" });
  }
};

exports.deleteFile = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedFile = await File.deleteMany({
      where: { id: Number(id), userId },
    });
    if (deletedFile.count === 0) {
      return res.status(404).render("error", { message: "File not found" });
    }
    res.redirect("/files/folders");
  } catch (error) {
    res.status(500).render("error", { message: "Error deleting file" });
  }
};

exports.downloadFile = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const file = await File.findFirst({
      where: { id: Number(id), userId },
    });
    if (!file) {
      return res.status(404).render("error", { message: "File not found" });
    }
    const filePath = path.resolve(file.path);
    res.download(filePath, file.name);
  } catch (error) {
    res.status(500).render("error", { message: "Error downloading file" });
  }
};
