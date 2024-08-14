const multer = require("multer")
const express = require("express")
const { registerController, loginController, getUserController, updateUserController, deleteUserController } = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

// Multer configuration for file upload
//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})


// Router level middleware
const userRouter = express.Router()

// User registration route with file upload middleware
userRouter.post("/sign-up", upload.single('image'), registerController)
userRouter.post("/sign-in", loginController)


// User details access 
userRouter.get("/get-user", authMiddleware, getUserController)
userRouter.post("/update-user", authMiddleware, updateUserController)
userRouter.post("/delete-user", authMiddleware, deleteUserController)

module.exports = userRouter