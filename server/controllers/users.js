// Hash the password
import bcrypt from "bcryptjs";

// Store users in browser for some period of time
import jwt from "jsonwebtoken";

import User from "../models/users.js";
import { config } from "../config/config.js";

// signin controller
export const signin = async (req, res) => {
    // For signin, get email and password from the frontend
    const { email, password } = req.body;

    try {
        // We're signing in - that means the user exists
        const existingUser = await User.findOne({ email });

        // If user doesn't exists
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist!" });
        }

        // User exists. Check the password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        // Password not correct
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        // If the user exists and the password is correct - create token for user - get jsonwebtoken - send to frontend
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            config.tokenSecret,
            {
                expiresIn: config.tokenExpiration,
            }
        );

        // send user - existingUser
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        // If token creation was unsuccessfull
        console.error(`Error7: ${error}`);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// signup controller - Adding user to database
export const signup = async (req, res) => {
    // get something from frontend
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        // Find if user already exists
        const existingUser = await User.findOne({ email });

        // If user exists - can't sign up in that case
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // User doesn't exists and password doesn't match confirmPassword
        if (!(password === confirmPassword)) {
            return res.status(404).json({ message: "Passwords do not match!" });
        }

        // User doesn't exists and passwords match
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const result = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
        });

        // Create the token for the user
        const token = jwt.sign(
            {
                email: result.email,
                id: result._id,
            },
            config.tokenSecret,
            { expiresIn: config.tokenExpiration }
        );

        // return user
        res.status(201).json({ result, token });
    } catch (error) {
        // If token creation was unsuccessfull
        res.status(500).json({ message: "Something went wrong!" });
        console.error(`Error8: ${error}`);
    }
};
