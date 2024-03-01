import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPost = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            user
        });

    } catch (e) {
        console.log('There was an error');
        console.log(e);
    }
}

export const userPut = async (req, res) => {
    const {id} = req.user;
    const {oldPassword, newPassword, _id, status, __v, ...rest} = req.body;

    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                msg:'Sign in first'
            });
        }

        if (oldPassword && newPassword) {
            const validOldPassword = bcryptjs.compareSync(oldPassword, user.password);
            if (!validOldPassword) {
                return res.status(400).json({
                    msg: 'incorrect old password '
                });
            }
            const newPasswordtrocket = bcryptjs.hashSync(newPassword, 10);
            user.password = newPasswordtrocket;
        }

        for (const key in rest) {
            user[key] = rest[key];
        }

        await user.save();

        res.status(200).json({
            msg: 'User updated'
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error processing request'
        });
    }
}