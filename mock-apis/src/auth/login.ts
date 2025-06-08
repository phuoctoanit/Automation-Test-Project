import express from 'express';
import { Request, Response } from 'express';
import { config } from '../../configs/config';
type RequestHandler = express.RequestHandler;

export const login = (req: Request, res: Response) => {
    const { username, password} = req.body;

    if(username === `${config.USERNAME}` && password === `${config.PASSWORD}`) {
        res.status(200).json({
            token: `${config.AUTH_TOKEN}`
        });
        return;
    }

    res.status(401).json({
        message: 'Invalid credentials'
    })
};