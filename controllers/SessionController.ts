import {getRepository} from 'typeorm';
import User from '../models/User'; 
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
//import orphanageView from '../views/orphanages_view';
//import * as Yup from 'yup'; 

export default {
    async store(request: Request,response: Response){
        const {email, password} = request.body;
        const usersRepository = getRepository(User);
        console.log(email);
        const user = await usersRepository.findOne({ where: { email: email} })
        if(!user){
            return response.status(401).json({error: "Usuário não existe."});
        }
        
        if(!user.comparePassword(password)){
            return response.status(401).json({error: "Senha incorreta."});
        }

        const {id,name} = user;
        return response.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({id},'a5120689492cc7173859ae897f225714', {
                expiresIn: '7d'
            })
        });
    }
    
}