import { faker } from "@faker-js/faker/.";
import { Client } from "src/app/models/client.model";

export const mockClient: Client = {
  clientId: faker.string.alphanumeric(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  cellPhone: parseInt(faker.phone.number()),
  address: faker.location.streetAddress(),
  email: `${faker.person.firstName()}@example.com`
}
