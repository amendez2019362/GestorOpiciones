import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { publicationDelete, publicationGet, publicationPost, publicationPut } from "./publication.controller.js";
import validateJWT from "../middlewares/validate-jwt.js"

const router = Router();


router.get("/",
    publicationGet
);

router.post(
    "/",
    [
        validateJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("mainText", "A text is needed to advance").not().isEmpty(),
        validateFields
    ], publicationPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("mainText", "A text is needed to advance").not().isEmpty(),
        validateFields
    ], publicationPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        validateFields
    ], publicationDelete
);

export default router;