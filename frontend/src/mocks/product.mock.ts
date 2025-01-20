import { faker } from "@faker-js/faker/.";
import { CreateProductDTO, Product, UpdateProductDTO } from "src/app/models/product.model";

export const mockProductResponse: Product = {
  productId: faker.number.int(),
  name: faker.commerce.productName(),
  categoryId: faker.number.int(),
  price: parseInt(faker.commerce.price(), 10),
  stock: faker.number.int(),
  active: faker.datatype.boolean(),
  imgUrl: faker.image.url(),
  category: {
    categoryId: faker.number.int(),
    category: faker.commerce.department(),
    active: faker.datatype.boolean(),
  },
}

export const mockCreateProductRequest: CreateProductDTO = {
  name: faker.commerce.productName(),
  categoryId: faker.number.int(),
  price: parseInt(faker.commerce.price(), 10),
  stock: faker.number.int(),
  active: faker.datatype.boolean(),
  imgUrl: faker.image.url(),
}

export const mockUpdateProductRequest: UpdateProductDTO = {
  name: faker.commerce.productName(),
  categoryId: faker.number.int(),
  price: parseInt(faker.commerce.price(), 10),
  stock: faker.number.int(),
  active: faker.datatype.boolean(),
  imgUrl: faker.image.url(),
}
