const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken");

// Register Controller
const registerController = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, tc } = req.body;
        const { filename: image } = req.file;

        if (!name || !email || !password || !confirmPassword || !image || tc === undefined) {
            return res.status(400).send({ message: "All fields are required", success: false });
        }

        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match", success: false });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists, please login", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            image,
            tc
        });

        await newUser.save();

        res.status(201).send({ message: "Registration successful", success: true });
    } catch (error) {
        console.error("Error in registerController:", error);
        next(error);
    }
};

// Login Controller
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({ message: "Please enter email and password", success: false });
        }

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).send({ message: "User not found, Please register", success: false });
        }

        const isMatched = await bcrypt.compare(password, existingUser.password);
        if (!isMatched) {
            return res.status(400).send({ message: "Incorrect password", success: false });
        }

        const userId = existingUser._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("auth_token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
        res.status(200).send({ message: "Logged in successfully", success: true });
    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).send({ message: "Internal Server Error", success: false });
    }
};

// Logout Controller
const logoutController = async (req, res) => {
    try {
        res.clearCookie("auth_token");
        res.status(200).send({ message: "Logout Successful" });
    } catch (error) {
        console.error("Error in logoutController:", error);
        res.status(500).send({ message: "Internal Server Error", success: false });
    }
};

// Get User Controller
const getUserController = async (req, res) => {
    try {
        const { userId } = req;
        const userDetails = await userModel.findById(userId).select("-password");
        if (!userDetails) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        res.status(200).send(userDetails);
    } catch (error) {
        console.error("Error in getUserController:", error);
        res.status(500).send({ message: "Internal Server Error", success: false });
    }
};

// Update User Controller
const updateUserController = async (req, res) => {
    try {
        const userId = req.userId;
        const data = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: { ...data } }, { new: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        res.status(200).send({ message: "User Details Updated", userData: updatedUser });
    } catch (error) {
        console.error("Error in updateUserController:", error);
        res.status(500).send({ message: "Internal Server Error", success: false });
    }
};

// Delete User Controller
const deleteUserController = async (req, res) => {
    try {
        const userId = req.userId;
        await User.findByIdAndDelete(userId);
        res.clearCookie("auth_token");
        res.status(200).send({ message: "User Deleted" });
    } catch (error) {
        console.error("Error in deleteUserController:", error);
        res.status(500).send({ message: "Internal Server Error", success: false });
    }
};

// module.exports = { registerController };
module.exports = { registerController, loginController, logoutController, getUserController, updateUserController, deleteUserController };
