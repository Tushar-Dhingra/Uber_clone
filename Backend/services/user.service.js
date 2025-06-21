const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All feilds are required");
  }
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = { createUser, hashPassword };