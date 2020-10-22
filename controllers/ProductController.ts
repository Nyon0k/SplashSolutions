import {getRepository, getConnection} from 'typeorm';
import Product from '../models/Product'; 
import {Request, Response} from 'express';
//import orphanageView from '../views/orphanages_view';
//import * as Yup from 'yup'; 

export default {
    async index(request: Request,response: Response){
        const productsRepository = getRepository(Product);
        const products = await productsRepository.find();
        return response.json(products);
    },

    async show(request: Request,response: Response){
        const {id} = request.params
        const productsRepository = getRepository(Product);
        const product = await productsRepository.findOneOrFail(id);
        return response.json(product);
    },

    async create(request: Request,response: Response){
        const {
            name,
            price
        } = request.body;
        
        const productsRepository = getRepository(Product);
        
        // const requestImages = request.files  as Express.Multer.File[];
        // const images = requestImages.map(image => {
        //     return {path: image.filename}
        // });

        const record = {
            "type": "Perecível",
            "amount_available": 40,
            "phone": 238904791237
        }
        
        const users = [
            {
                name: "Carlos Eduardo",
                cpf: "03716579203",
                email: "Cadu@gmail.com",
                password: "senha123"

            },
            {
                name: "Roberson Freitas",
                cpf: "01628016299",
                email:  "robsonf@gmail.com",
                password: "senha234"
            }
        ]
        const store = null;
        const data = {
            name,
            price,
            record
        };

        // const schema = Yup.object().shape({
        //     name: Yup.string().required(),
        //     latitude: Yup.number().required(),
        //     longitude: Yup.number().required(),
        //     about: Yup.string().required().max(300),
        //     instructions: Yup.string().required(),
        //     opening_hours: Yup.string().required(),
        //     open_on_weekends: Yup.boolean().required(),
        //     images: Yup.array(
        //         Yup.object().shape({
        //         path: Yup.string().required()
        //     })
        //     )
        // });

        // await schema.validate(data, {
        //     abortEarly: false
        // });
        const product = productsRepository.create(data);    
    
        await productsRepository.save(product);
        return response.status(201).json(product);
    },

    async update(request: Request,response: Response){
        const {id} = request.params;
        const {name, price} = request.body;
        
        var x:  number = +id;
        const productsRepository = getRepository(Product);
        let product = await productsRepository.findOneOrFail(id);
        product.name = name;
        product.price = price;
        await productsRepository.save(product);
        return response.json(product);
    },

    async destroy(request: Request,response: Response){
        const {id} = request.params;
        const productsRepository = getRepository(Product);
        const product = await productsRepository.findOneOrFail(id);
        await productsRepository.delete(id);
        return response.json({message: 'Produto deletado.'});
    }
    
}