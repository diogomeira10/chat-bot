import { Router } from "express";
import { getAllUsers, userSignUp, userLogin } from "../controllers/user-controllers.js";
import { validate, signupValidator } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignUp);
userRoutes.post('/login', userLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map