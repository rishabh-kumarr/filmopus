import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Do something and move to next
const auth = async (req, res, next) => {
    try {
        // Check if user is really who he claims to be
        // Check the token of user is valid or not - Get token from frontend
        const token = req.headers.authorization.split(" ")[1];

        // Verify whether the signed users are same or not - controllers/users
        try {
            const decodedData = jwt.verify(token, config.tokenSecret);
            req.userId = decodedData?.id;
        } catch (error) {
            console.error(`Error9: ${error}`);
            // return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.error(`Error10: ${error}`);
        res.status(401).json({ message: "Unauthorized!" });
    }
};

export default auth;
