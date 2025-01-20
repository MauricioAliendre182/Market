import { CreateUserDTO, User } from "src/app/models/user.model";
import { faker } from '@faker-js/faker';

export const mockAdminUser: CreateUserDTO = {
  name: faker.person.firstName(),
  username: faker.internet.username(),
  password: faker.internet.password(),
}

export const mockResponseAdminUser: User = {
  idUser: faker.number.int(),
  name: faker.person.firstName(),
  username: faker.internet.username(),
  password: faker.internet.password(),
};

export const mockCustomerUser: CreateUserDTO = {
  name: faker.person.firstName(),
  username: faker.internet.username(),
  password: faker.internet.password(),
}

export const mockResponseCustomerUser: User = {
  idUser: faker.number.int(),
  name: faker.person.firstName(),
  username: faker.internet.username(),
  password: faker.internet.password(),
};
