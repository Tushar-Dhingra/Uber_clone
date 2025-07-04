const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vechile } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainService.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vechile: {
            color: vechile.color,
            plate: vechile.plate,
            capacity: vechile.capacity,
            vechileType: vechile.vechileType,
        },
});

    const token = captain.genrateAuthToken();

    res.status(201).json({ captain, token }); 
};