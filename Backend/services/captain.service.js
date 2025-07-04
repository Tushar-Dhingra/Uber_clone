const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");

const createCaptain = async ({
    fullname,
    email,
    password,
    vechile
}) => {
    const {firstname, lastname} = fullname || {};
    const { color, plate, capacity, vechileType } = vechile || {};

    if(!firstname || !email || !password || !color || !plate || !capacity || !vechileType) {
        throw new Error("All feilds are required");
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vechile: {
            color,
            plate,
            capacity,
            vechileType,
        },
    });
    return captain;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = { createCaptain, hashPassword };
