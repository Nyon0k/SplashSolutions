import Faker from 'faker';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import {define} from 'typeorm-seeding';

  define(User, (faker: typeof Faker) => {
    const name = faker.name.firstName();
    const email = name.concat('@gmail.com');
    const cpf = faker.random.number({'min': 10000000000, 'max': 99999999999}).toString();
    const password = bcrypt.hashSync(faker.internet.password(10),10);
  
    const user = new User();
    user.name = name;
    user.cpf = cpf;
    user.email = email
    user.password = password;
    return user
  })