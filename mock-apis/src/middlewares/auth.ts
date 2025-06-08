import { NextFunction, Request, Response } from "express";
import { config } from "../../configs/config";

export const authMiddleware = (req: Request, res: Response, next:NextFunction) => {
    // Check if the request has a valid authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    const configToken = config.AUTH_TOKEN;
    // Here you would typically verify the token (e.g., using JWT)
    // For simplicity, we will just check if the token matches a hardcoded value
    if (token !== configToken) {
        res.status(403).json({ error: 'Forbidden' });
        return;
    }

    // If the token is valid, proceed to the next middleware or route handler
    next();
}