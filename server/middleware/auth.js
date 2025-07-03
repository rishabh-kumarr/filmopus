import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Do something and move to next
const auth = async (req, res, next) => {
    try {
        // Check if user is really who he claims to be
        // Check the token of user is valid or not - Get token from frontend
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided!" });
        }

        const token = authHeader.split(" ")[1];

        // Verify whether the signed users are same or not - controllers/users
        try {
            const decodedData = jwt.verify(token, config.tokenSecret);
            req.userId = decodedData?.id;
        } catch (error) {
            console.error(`Invalid Token: ${error.message}`);
            // return res.status(403).json({ message: "Token is invalid or expired!" });
        }

        next();
    } catch (error) {
        console.error(`Auth middleware error: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export default auth;
