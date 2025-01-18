import { CreateUserDTO, User } from "src/app/models/user.model";

export const mockAdminUser: CreateUserDTO = {
  name: 'admin',
  username: 'admin',
  password: 'password123',
}

export const mockResponseAdminUser: User = {
      idUser: 1,
      name: 'admin',
      username: 'admin',
      password: '$2a$10$3ejY/i65aR6Kj1eA5BLAMebKhYYSMKyySN8qEtddXWZcSt5id9f7S',
};

export const mockCustomerUser: CreateUserDTO = {
  name: 'customer',
  username: 'customer',
  password: 'password123',
}

export const mockResponseCustomerUser: User = {
  idUser: 1,
  name: 'customer',
  username: 'customer',
  password: '$2a$10$3ejY/i65aR6Kj1eA5BLAMebKhYYSMKyySN8qEtddXWZcSt5id9f7S',
};
