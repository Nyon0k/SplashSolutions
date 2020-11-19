import {getRepository, getConnection} from 'typeorm';
import Store from '../models/Store'; 
import {Request, Response} from 'express';
//import * as Yup from 'yup'; 

export default {
    async index(request: Request,response: Response){
        const storesRepository = getRepository(Store);
        const stores = await storesRepository.find();
        return response.json(stores);
    },

    async show(request: Request,response: Response){
        const {id} = request.params
        const storesRepository = getRepository(Store);
        const store = await storesRepository.findOneOrFail(id);
        return response.json(store);
    },

    async create(request: Request,response: Response){
        const {
            name,
            address,
            cep,
            cnpj
        } = request.body;
    
        const storesRepository = getRepository(Store);

        // const requestImages = request.files  as Express.Multer.File[];
        // const images = requestImages.map(image => {
        //     return {path: image.filename}
        // });

        const products = [
            {
                 name: 'produto 1',
                 price:  Math.ceil(Math.random() * 100)    
            },
            {
                name: 'produto 2',
                price:  Math.ceil(Math.random() * 100)
            }
        ]

        const data = {
            name,
            address,
            cep,
            cnpj,
            products
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
        const store = storesRepository.create(data);    
    
        await storesRepository.save(store);
        return response.status(201).json(store);
    },

    async update(request: Request,response: Response){
        const {id} = request.params;
        const {name, address, cep, cnpj} = request.body;
  
        var x:  number = +id;
        const storesRepository = getRepository(Store);
        let store = await storesRepository.findOneOrFail(id);
        store.name = name;
        store.address = address;
        store.cep = cep;
        store.cnpj = cnpj;
        await storesRepository.save(store);
        return response.json(store);
    },

    async destroy(request: Request,response: Response){
        const {id} = request.params;
        const storesRepository = getRepository(Store);
        const store = await storesRepository.findOneOrFail(id);
        await storesRepository.delete(id);
        return response.json("Loja Deletada.");
    }
    
}