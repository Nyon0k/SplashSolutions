import {getRepository, getConnection} from 'typeorm';
import Record from '../models/Record'; 
import {Request, Response} from 'express';

export default {

    /*
    * @index
    *
    * Função que retorna a lista de todos os Records
    * 
    * @param {Request}
    * @return {Response}
    */
    async index(request: Request,response: Response){
        const recordsRepository = getRepository(Record);
        const records = await recordsRepository.find();
        return response.json(records);
    },

    /*
    * @show
    *
    * Retorna um Record
    * 
    * @param {Request} -> id
    * @return {Response}
    */
    async show(request: Request,response: Response){
        const {id} = request.params
        const recordsRepository = getRepository(Record);
        const record = await recordsRepository.findOneOrFail(id);
        return response.json(record);
    },

    /*
    * @create
    *
    * Cria e retorna um Record
    * 
    * @param {Request} -> name, price
    * @return {Response}
    */
    async create(request: Request,response: Response){
        const {
            type,
            amount_available,
            phone
        } = request.body;
    
        const recordsRepository = getRepository(Record);

        const data = {
            type,
            amount_available,
            phone
        };

        const record = recordsRepository.create(data);    
    
        await recordsRepository.save(record);
        return response.status(201).json(record);
    },

    /*
    * @update
    *
    * Atualiza um Record
    * 
    * @param {Request} -> id, parametro que deseja alterar
    * @return {Response}
    */
    async update(request: Request,response: Response){
        const {id} = request.params;
        const {type, amount_available, phone} = request.body;
  
        var x:  number = +id;
        const recordsRepository = getRepository(Record);
        let record = await recordsRepository.findOneOrFail(id);
        record.type = type;
        record.amount_available = amount_available;
        record.phone = phone;
        await recordsRepository.save(record);
        return response.json({message: "Registro atualizado."});
    },

    /*
    * @destroy
    *
    * Deleta um Record
    * 
    * @param {Request} -> id
    * @return {Response}
    */
    async destroy(request: Request,response: Response){
        const {id} = request.params;
        const recordsRepository = getRepository(Record);
        const record = await recordsRepository.findOneOrFail(id);
        await recordsRepository.delete(id);
        return response.json("Registro deletado.");
    }
    
}