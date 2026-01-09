const userController = require("../controllers/userControllers")
const express = require("express")
const router = express.Router()




router.get("/resume/:userID/:resumeTitle",userController.getResume)

router.post("/signup",userController.SignUp)
router.post("/api/resume",userController.addResume)
router.get("/api/user-resumes/:userId",userController.userResumes)
router.post("/login",userController.Login)
router.get("/userData",userController.userData)
router.post("/logout",userController.logout)
router.post("/AI",userController.AI)

module.exports = router

