import User from "../models/user-model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js";
export const signUp = async (req, res, next) => {
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


export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found !'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credential!'))
        }
        // create token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        // remove pass-before sent it to the client
        const { password: pass, ...rest } = validUser._doc
        // Save the token in a cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
        }).status(200).json({ rest });

    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const { email, name, photo } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
            }).status(200).json({ ...rest });
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const username = name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                avatar: photo,
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
            }).status(200).json({ ...rest });
        }
    } catch (error) {
        next(error);
    }
};