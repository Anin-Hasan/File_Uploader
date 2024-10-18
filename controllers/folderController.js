const { PrismaClient } = require("@prisma/client");
const { Folder } = require("../utils/prisma");
const prisma = new PrismaClient();

exports.createFolder = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const folder = await Folder.create({
      data: {
        name,
        userId,
      },
    });
    res.redirect("/files/folders");
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { message: "Error creating folder." });
  }
};

exports.getFolders = async (req, res) => {
  const userId = req.user.id;

  try {
    const folders = await Folder.findMany({ where: { userId } });
    res.render("folders", { folders });
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { message: "Error getting folders." });
  }
};

exports.getFolder = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const folder = await Folder.findFirst({
      where: { id: Number(id), userId },
      include: { files: true },
    });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }
    res.render("folder", { folder });
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { message: "Error getting this folder." });
  }
};

exports.updateFolder = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.id;
  console.log("hello from update Folder");
  try {
    const updatedFolder = await Folder.updateMany({
      where: { id: Number(id), userId },
      data: { name },
    });
    if (updatedFolder.count === 0) {
      console.log("can't update");
      return res.status(404).render("error", { message: "Folder not found" });
    }
    res.redirect("/files/folders");
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { message: "Error updating this folder." });
  }
};

exports.deleteFolder = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const deletedFolder = await Folder.delete({
      where: { id: Number(id), userId },
    });
    if (deletedFolder.count === 0) {
      console.log("can't delete");
      return res.status(404).render("error", { message: "Folder not found" });
    }
    res.redirect("/files/folders");
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { message: "Error deleting this folder." });
  }
};
