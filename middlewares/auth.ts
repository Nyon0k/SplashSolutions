import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';
export default function (request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(401).json({error: 'Token não existe.'});
    }

    const [,token] = authHeader.split(' ');

    try{
        const decoded = jwt.verify(token, authConfig.secret);
        console.log(decoded);
        request.body.id = (<any>decoded).id;
        return next();
    }catch{
        return response.status(401).json({error: 'Token inválido.'});
    }
}