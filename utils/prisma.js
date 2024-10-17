// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = prisma.user;
const File = prisma.file;
const Folder = prisma.folder;

module.exports = {
  User,
  File,
  Folder,
};
