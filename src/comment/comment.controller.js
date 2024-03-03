import { response, request } from "express";
import Comment from "./comment.model.js";
import Publication from "../publication/publication.model.js";
import userModel from "../user/user.model.js";

export const commentGet = async (req, res = response) => {
    
    const {limit, from} = req.query;
    const query = {status: true};
    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        comments
    })
}

export const commentPost = async (req, res,) => {
    try {
        const { commentTitle, commentContent, publicationId } = req.body();
        const userId = req.user._id;
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({
                msg: 'Post could not be found'
            });

        }

        if (!publication.status) {
            return res.status(404).json({
                msg: 'Post could not be found'
            });
        }

        const comment = new Comment({ commentTitle, commentContent, publicationId, userId });
        await comment.save();

        res.status(200).json({
            Title: commentTitle,
            Content: commentContent,
            msg: `You commented on this post: ${publication.title}`
        });

    } catch (e) {
        console.log('There are missing fields to fill out');
        console.log(e)
    }
}

export const commentPut = async (req, res) => {
    try {
        const { __v, _id, status, publicationId, userId, ...rest } = req.body;
        const loggedUser = req.user._id;
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        const commentUserId = comment.userId.toString();
        const loogedUserId = loggedUser.toString();

        if (commentUserId !== loogedUserId) {
            return res.status(403).json({
                msg: 'You need permissions'
            });
        }

        Object.assign(comment, rest);
        await comment.save();
        
        res.status(200).json({
            msg: 'Comment updated'
        });

    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'could not be processed'
        });
    }
}

export const commentDelete = async (req, res) => {
    try {
        const userId = req.user._id;
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        if(!comment.status){
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        const commentUserId = comment.userId.toString();
        const loogedUserId = userId.toString();

        if (commentUserId !== loogedUserId) {
            return res.status(403).json({
                msg: 'You need permissions'
            });
        }

        comment.status = false;

        res.status(200).json({
            msg: 'Comment was deleted'
        });

        await comment.save();

    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'Processing error'
        });
    }
}