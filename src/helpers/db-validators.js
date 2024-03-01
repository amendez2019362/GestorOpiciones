import User from "../user/user.model.js";

export const existUserEmail = async (email = '') => {
    const existUserEmail = await User.findOne({email});
    if (existUserEmail){
        throw new Error(`This email ${email} has already been registered previously`);

    }
}

export const existUserName = async (name = '') => {
    const existUserName = await User.findOne({name});
    if(existUserName){
        throw new Error(`This user ${name} is already in the database, register a new one`);
    }
}