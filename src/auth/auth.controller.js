import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import {generateJWT} from '../helpers/generate-jwt.js';

const token = '';
export const login = async (req, res) => {
    const { email, name, password} = req.body;

    try {
        let user;

        if (email) {
            user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({
                    msg: 'The email has not been registered'
                });
            }

            if (!user.status) {
                return res.status(400).json({
                    msg: 'This email does not exist in the database'
                });
            }

            const VPassword = bcryptjs.compareSync(password, user.password);
            if (!VPassword) {
                return res.status(400).json({
                    msg: 'Incorrect password'
                });
            }

            token = await generateJWT(user.id)

            console.log(token);

            res.status(200).json({
                msg: `Successful login, user: ${user.name}. You are assigned a token: ${token}`
            });

        }else if (name) {
            user = await User.findOne({name})

            if (!user) {
                return res.status(400)({
                    msg: 'This user has not registered'
                });
            }
            if (!user.status) {
                return res.status(400).json({
                    msg: 'This user does not exist in the database'
                });
            }

            const VPassword = bcryptjs.compareSync(password, user.password);
            if (!VPassword) {
                return res.status(400).json({
                    msg: 'Incorrect password'
                });
            }

            const token = await generateJWT(user.id)
            res.status(200).json({
                msg: `Successful login, user: ${user.name}. You are assigned a token: ${token}`
            });

        } else{
            return res.status(400).json({
                msg: 'A username or email is required to log in.'
            });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'Consult administrators'
        });
    }
}

export const getToken = () => {
    return token;
}