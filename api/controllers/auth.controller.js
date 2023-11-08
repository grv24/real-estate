import User from "../models/user-model.js";
import bcryptjs from 'bcryptjs'
export const signUp = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = await new User({ username, email, password: hashedPassword });

        await newUser.save()

        res.status(200).json({
            message: "user saved successfully",
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}


