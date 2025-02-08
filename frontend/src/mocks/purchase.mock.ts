import { faker } from '@faker-js/faker/.';
import { Items, Purchase } from 'src/app/models/purchase.model';

const mockItems: Items = {
  productId: faker.number.int(),
  quantity: faker.number.int(),
  total: faker.number.int(),
  active: true,
};

export const mockPurchase: Purchase = {
  purchaseId: faker.number.int(),
  clientId: faker.string.alphanumeric(),
  date: faker.date.recent(),
  paymentMethod: faker.string.symbol(),
  comment: faker.lorem.sentence(),
  state: faker.string.sample(),
  items: [{ ...mockItems }, { ...mockItems }],
};
