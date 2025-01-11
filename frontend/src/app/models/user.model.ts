export interface User {
  idUser: number;
  name: string;
  username: string;
  password: string;
  // roles: Array<'ROLE_CUSTOMER' | 'ROLE_ADMIN'>
}

export interface CreateUserDTO extends Omit<User, "idUser" | "roles"> {
}

export interface LoginUser extends Omit<User, "idUser" | "name" | "roles"> {

}

export interface LoginAuth extends Omit<User, "idUser" | "name" | "password"> {
  token: string;
}
