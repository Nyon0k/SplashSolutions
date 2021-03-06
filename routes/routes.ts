import {Router} from 'express';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import ProductController from '../controllers/ProductController';
import StoreController from '../controllers/StoreController';
import RecordController from '../controllers/RecordController';
import SessionController from '../controllers/SessionController';
import auth from '../middlewares/auth';
import uploadConfig from '../config/upload';
const routes = Router();
const upload = multer(uploadConfig);


//Rotas de User
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', upload.array('images'),UsersController.create);
routes.put('/users',auth,UsersController.update);
routes.delete('/users/:id',UsersController.destroy);

//Rotas de Product
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.create);
routes.put('/products/:id',ProductController.update);
routes.delete('/products/:id',ProductController.destroy);

//Rotas de Store
routes.get('/stores', StoreController.index);
routes.get('/stores/:id', StoreController.show);
routes.post('/stores', StoreController.create);
routes.put('/stores/:id',StoreController.update);
routes.delete('/stores/:id',StoreController.destroy);

//Rotas de Record
routes.get('/records', RecordController.index);
routes.get('/records/:id', RecordController.show);
routes.post('/records', RecordController.create);
routes.put('/records/:id',RecordController.update);
routes.delete('/records/:id',RecordController.destroy);

//Rotas de Session
routes.put('/session',SessionController.store);
export default routes;