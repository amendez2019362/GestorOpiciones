import { Router } from "express";
import { check, checkSchema } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { existUserEmail, existUserName } from "../helpers/db-validators.js";
import { userPost, userPut } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
const router = Router();

router.post(
    "/",
    [
        check("name", "This section is required").not().isEmpty(),
        check("name").custom(existUserName),
        check("email", "This section is required").isEmail(),
        check("email").custom(existUserEmail),
        check("password", "This section is required, The password must be more than 6 characters").isLength({min: 6}),
        validateFields
    ], userPost);

router.put(
    "/",
    [
        validateJWT,
        check("name").custom(existUserName),
        check("email").custom(existUserEmail),
        check("oldPassword", "The password must be more than 6 characters").isLength({min: 6}),
        check("newPassword", "The password must be more than 6 characters").isLength({min: 6}),
        validateFields
    ], userPut);

export default router;