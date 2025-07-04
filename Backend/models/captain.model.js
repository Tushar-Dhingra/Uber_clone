const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },

    vechile: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1 person"],
        },
        vechileType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
        },

    },

    location: {
        lon: {
            type: Number,
        },
        lat: {
            type: Number,
        }
    }
});

captainSchema.methods.genrateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" } // Token expires in 24 hour
    );
    return token;
};


captainSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

// captainModel.statics.hashPassword = async function (password) {
//     return await bcrypt.hash(password, 10);

// }

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;