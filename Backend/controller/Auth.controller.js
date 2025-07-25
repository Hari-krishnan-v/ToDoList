import {generateToken, setCookie, ValidateUserdata} from "../utils/helper.js";
import User from "../models/user.model.js";

import bcrypt from "bcrypt";

export const RegisterUser = async (req, res, next) => {

    try {
        ValidateUserdata(req.body);
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password:hashedPassword

        });

        const token = generateToken(newUser);

        setCookie(res,"token", token);

        res.status(201).json({
            message: 'User registered successfully',
            isAuthenticated: true,
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    }catch (error) {
        next(error);
    }
}

export const LoginUser = async (req, res, next) => {
    try {
        console.log("in backend recived data" ,req.body)
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.clearCookie("token");
        const token = generateToken(user);

        setCookie(res,"token", token);



        res.status(200).json({
            message: 'Login successful',
            token,
            isAuthenticated: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
}

export const LogoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
}

export const CheckAuthentication = async (req, res, next) => {
    try {
      const userid = req.user.id

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'User is authenticated',
            isAuthenticated: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        next(error);
    }
}