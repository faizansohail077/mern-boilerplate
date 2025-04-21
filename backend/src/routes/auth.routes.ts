import { Router } from "express";
import { login, signup } from "../controller/auth.controller";

const router: Router = Router();

router.post("/login", login);
router.post("/signup", signup);

export { router as authRouter };
