import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    "/",[
        check("password", "Password is required").not().isEmpty(),
        validateFields
    ], login);

export default router;