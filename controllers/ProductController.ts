import {getRepository, getConnection} from 'typeorm';
import Product from '../models/Product'; 
import {Request, Response} from 'express';
import User_Product from '../models/User_Product';
import User from '../models/User';

export default {
    
    /*
    * @index
    *
    * Função que retorna a lista de todos os Products
    * 
    * @param {Request}
    * @return {Response}
    */
    async index(request: Request,response: Response){
        const productsRepository = getRepository(Product);
        const products = await productsRepository.find();
        return response.json(products);
    },

    /*
    * @show
    *
    * Retorna um Product
    * 
    * @param {Request} -> id
    * @return {Response}
    */
    async show(request: Request,response: Response){
        const {id} = request.params
        const productsRepository = getRepository(Product);
        const product = await productsRepository.findOneOrFail(id);
        return response.json(product);
    },

    /*
    * @create
    *
    * Cria e retorna um Product
    * 
    * @param {Request} -> name, price
    * @return {Response}
    */
    async create(request: Request,response: Response){
        const {
            name,
            price
        } = request.body;
        
        // const productsRepository = getRepository(Product);
        // const userRepository = getRepository(User);
        
        // const requestImages = request.files  as Express.Multer.File[];
        // const images = requestImages.map(image => {
        //     return {path: image.filename}
        // });

        const record = {
            "type": "Perecível",
            "amount_available": 40,
            "phone": 238904791237
        }
        
        const userData = 
            {
                name: "Carlos Eduardo",
                cpf: "03716579203",
                email: "Cadu@gmail.com",
                password: "senha123"
            }
        
        const store = {
            "name": "Botafogo e Gelo",
            "address": "Botafogo",
            "cep": "22250040",
            "cnpj": "12345678910"
        };
       
        const data = {
            name,
            price,
            record,
            store,
        };

        // const product = productsRepository.create(data);    
        // const user = userRepository.create(userData);
        
        // await userRepository.save(user);
        // await productsRepository.save(product);

        const userProdRepo = getRepository(User_Product);
        const user = userData;
        const product = data;
        const userProdData = {
            product,
            user  
        }
        const userProd = userProdRepo.create(userProdData);
        await userProdRepo.save(userProd);
        return response.status(201).json(userProd);
    },

    /*
    * @update
    *
    * Atualiza um Product
    * 
    * @param {Request} -> id, parametro que deseja alterar
    * @return {Response}
    */
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

    /*
    * @destroy
    *
    * Deleta um Product
    * 
    * @param {Request} -> id
    * @return {Response}
    */
    async destroy(request: Request,response: Response){
        const {id} = request.params;
        const productsRepository = getRepository(Product);
        const product = await productsRepository.findOneOrFail(id);
        await productsRepository.delete(id);
        return response.json({message: 'Produto deletado.'});
    }
    
}