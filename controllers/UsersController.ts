import {getRepository, getConnection} from 'typeorm';
import User from '../models/User'; 
import {json, Request, Response} from 'express';
import bcrypt from 'bcrypt';
//import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup'; 

export default {
    async index(request: Request,response: Response){
        const usersRepository = getRepository(User);
        const users = await usersRepository.find();
        return response.json(users);
    },

    async show(request: Request,response: Response){
        const {id} = request.params
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOneOrFail(id);
        return response.json(user);
    },

    async create(request: Request,response: Response){
        const {
            name,
            cpf,
            email,
            password
        } = request.body;
        
       
        const usersRepository = getRepository(User);

        // const requestImages = request.files  as Express.Multer.File[];
        // const images = requestImages.map(image => {
        //     return {path: image.filename}
        // });
      
        const data = {
            name,
            cpf,
            email,
            password
        };

    

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required().max(11),
            email: Yup.string().required(),
            password: Yup.string().required(),
        });
        try{
            await schema.validate(data, {
                abortEarly: false,
            });
        }catch(err){
            return response.status(500).json(['Erro de validacao!']);
        };


        const user = usersRepository.create(data);    
        console.log(user);
        await usersRepository.save(user);
        return response.status(201).json(user);
    },

    async update(request: Request,response: Response){
        const {id} = request.body;
        console.log({body_id:id});
        const {name, cpf,email} = request.body;
  
        var x:  number = +id;
        console.log({x: x});
        const usersRepository = getRepository(User);
        let user = await usersRepository.findOneOrFail(id);
        user.name = name;
        user.cpf = cpf;
        user.email = email;
        await usersRepository.save(user);
        return response.json({message: "UPDATEDOU"});
    },

    async destroy(request: Request,response: Response){
        const {id} = request.params;
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOneOrFail(id);
        await usersRepository.delete(id);
        return response.json("APAGOU CARAI");
    }
    
}