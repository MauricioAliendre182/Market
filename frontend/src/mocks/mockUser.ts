import { CreateUserDTO } from "src/app/models/user.model";

export const mockAdminUser: CreateUserDTO = {
  name: 'admin',
  username: 'admin',
  password: 'password123',
}

export const mockCustomerUser: CreateUserDTO = {
  name: 'customer',
  username: 'customer',
  password: 'password123',
}
