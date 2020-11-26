import {getRepository, getConnection} from 'typeorm';
import Store from '../models/Store'; 
import {Request, Response} from 'express';

export default {

    /*
    * @index
    *
    * Retorna a lista de todos os Stores
    * 
    * @param {Request}
    * @return {Response}
    */
    async index(request: Request,response: Response){
        const storesRepository = getRepository(Store);
        const stores = await storesRepository.find();
        return response.json(stores);
    },

    /*
    * @show
    *
    * Retorna um Store
    * 
    * @param {Request} -> id
    * @return {Response}
    */
    async show(request: Request,response: Response){
        const {id} = request.params
        const storesRepository = getRepository(Store);
        const store = await storesRepository.findOneOrFail(id);
        return response.json(store);
    },

    /*
    * @create
    *
    * Cria e retorna um Store
    * 
    * @param {Request} -> name, price
    * @return {Response}
    */
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

        const store = storesRepository.create(data);    
    
        await storesRepository.save(store);
        return response.status(201).json(store);
    },

    /*
    * @update
    *
    * Atualiza um Store
    * 
    * @param {Request} -> id, parametro que deseja alterar
    * @return {Response}
    */
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

    /*
    * @destroy
    *
    * Deleta um Store
    * 
    * @param {Request} -> id
    * @return {Response}
    */
    async destroy(request: Request,response: Response){
        const {id} = request.params;
        const storesRepository = getRepository(Store);
        const store = await storesRepository.findOneOrFail(id);
        await storesRepository.delete(id);
        return response.json("Loja Deletada.");
    }
    
}