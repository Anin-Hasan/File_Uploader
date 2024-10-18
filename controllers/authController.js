const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

exports.login = (req, res) => {
  res.redirect("/files/folders");
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
};
