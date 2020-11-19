import {getRepository, getConnection} from 'typeorm';
import Record from '../models/Record'; 
import {Request, Response} from 'express';
//import * as Yup from 'yup'; 

export default {
    async index(request: Request,response: Response){
        const recordsRepository = getRepository(Record);
        const records = await recordsRepository.find();
        return response.json(records);
    },

    async show(request: Request,response: Response){
        const {id} = request.params
        const recordsRepository = getRepository(Record);
        const record = await recordsRepository.findOneOrFail(id);
        return response.json(record);
    },

    async create(request: Request,response: Response){
        const {
            type,
            amount_available,
            phone
        } = request.body;
    
        const recordsRepository = getRepository(Record);

        // const requestImages = request.files  as Express.Multer.File[];
        // const images = requestImages.map(image => {
        //     return {path: image.filename}
        // });

        const data = {
            type,
            amount_available,
            phone
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
        const record = recordsRepository.create(data);    
    
        await recordsRepository.save(record);
        return response.status(201).json(record);
    },

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

    async destroy(request: Request,response: Response){
        const {id} = request.params;
        const recordsRepository = getRepository(Record);
        const record = await recordsRepository.findOneOrFail(id);
        await recordsRepository.delete(id);
        return response.json("Registro deletado.");
    }
    
}