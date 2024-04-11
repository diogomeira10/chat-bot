import { Router } from "express";
import { getAllUsers, userSignUp, userLogin, verifyUser, logoutUser } from "../controllers/user-controllers.js";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignUp);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.delete('/logout', logoutUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map