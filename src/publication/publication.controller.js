import { response } from "express";
import Publication from "./publication.model.js"


export const publicationGet = async (req, res = response) => {
    const { limit, from } = req.body;
    const query = { status: true };

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        publications
    })
}

export const publicationPost = async (req, res) => {
    try {
        const { title, category, mainText } = req.body;
        const userId = req.user._id;
        const publication = new Publication({ title, category, mainText, userId });

        const Title = `${title}`;
        const Category = `${category}`;
        const MainText = `${mainText}`;
        await publication.save();

        res.status(200).json({
            Title,
            Category,
            MainText
        });
    } catch (e) {
        console.log("A field was not entered, please check");
        console.log(e);
    }
}

export const publicationPut = async (req, res) => {
    try {
        const { __v, _id, status, ...rest } = req.body;
        const userId = req.user._id;
        const publicationId = req.params.id;

        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({
                msg: 'Post not found'
            });
        }

        const publicationUserId = publication.userId.toString();
        const requestingUserId = userId.toString();

        if (publicationUserId !== requestingUserId) {
            return res.status(403).json({
                msg: 'You need permissions to modify the post'
            });
        }

        Object.assign(publication, rest);
        await publication.save();

        res.status(200).json({
            msg: 'Post updated'
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'Bad request'
        });
    }
}

export const publicationDelete = async (req, res) => {
    try {
        const userId = req.user._id;
        const publicationId = req.params.id;
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({
                msg: 'Post not found'
            });
        }

        if (!publication.status) {
            return res.status(404).json({
                msg: 'Post not found'
            });
        }

        const publicationoUserId = publication.userId.toString();
        const requestingUserId = userId.toString();

        if (publicationoUserId !== requestingUserId) {
            return res.status(403).json({
                msg: 'You need permissions to delete this post'
            });
        }

        publication.status = false;
        await publication.save();

        res.status(200).json({
            msg: 'Post delete'
        });

    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'Invalid request'
        });
    }
}
