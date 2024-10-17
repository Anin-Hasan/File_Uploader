const { User } = require("../utils/prisma");
const bcrypt = require("bcryptjs");

const register = async ({ name, email, password }) => {
  //   console.log(name, email, password);
  const hashedPassowrd = await bcrypt.hash(password, 10);
  return User.create({
    data: { name, email, password: hashedPassowrd },
  });
};

module.exports = {
  register,
};
