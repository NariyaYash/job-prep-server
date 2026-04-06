const { Router } = require('express');
const { registerUserController, loginUserController, logoutUserController, getUserInfoController } = require('../controllers/auth.controller')
const { authUser } = require('../middleware/auth.middleware')

const authRouter = Router()


authRouter.post("/register", registerUserController)
authRouter.post("/login", loginUserController)
authRouter.get("/logout", logoutUserController)
authRouter.get("/get-me", authUser, getUserInfoController)


module.exports = authRouter