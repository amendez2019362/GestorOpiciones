import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'Token does not exist, please log in again'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'This user does not exist in the database'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'This token is invalid | This user is in false state'
            });
        }
        req.user = user

        next();
    } catch (e) {
        console.log('Error when token is created. You need to log in again')
        res.status(401).json({
            msg: 'This token is invalid'
        });
    }
}