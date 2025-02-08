import { faker } from "@faker-js/faker/.";
import { Category } from "src/app/models/category.model";

export const mockkCategory: Category = {
  categoryId: faker.number.int(),
  category: faker.food.ingredient(),
  active: true
}
