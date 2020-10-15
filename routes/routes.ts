import {Router} from 'express';
import UsersController from '../controllers/UsersController';

const routes = Router();

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/usersCreate', UsersController.create);
routes.put('/users/:id',UsersController.update);
routes.delete('/users/:id',UsersController.destroy);

export default routes;