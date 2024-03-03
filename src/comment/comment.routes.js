import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { commentDelete, commentGet, commentPost, commentPut } from "./comment.controller.js";

const router = Router();

router.get("/",
    commentGet
);

router.post(
    "/",
    [
       validateJWT,
       check('publicationId', 'Invalid format for MongoDB').isMongoId(),
       check('commentTitle', 'Title is required').not().isEmpty(),
       check('commentContent', 'Content is required').not().isEmpty(),
       validateFields
    ], commentPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check('commentTitle', 'Title is required').not().isEmpty(),
        check('commentContent', 'Content is required').not().isEmpty(),
    ], commentPut
);

router.delete(
    '/:id',
    [
        validateJWT,
        validateFields
    ], commentDelete
);

export default router;