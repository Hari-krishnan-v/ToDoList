import {verifyToken} from "../utils/helper.js";

export const Authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }
        // Verify the token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}