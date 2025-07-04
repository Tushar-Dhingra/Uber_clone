const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

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

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.genrateAuthToken();
    res.cookie("token", token)
    res.status(200).json({ captain, token });
};

module.exports.getCaptainProfile = async (req, res, next) => {
    if (!req.captain) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blacklistTokenModel.create({ token }); 
    //When a user logs out, you want to make sure their JWT (token) can't be used anymore.
    //Since JWTs are stateless and can't be "deleted" from the client or server, blacklisting is a common solution.
    //By saving the token in a blacklist, you can check this list on every protected route. If the token is found in the blacklist, you deny access.

    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
}
