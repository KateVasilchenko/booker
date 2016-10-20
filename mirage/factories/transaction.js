import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  walletId(i) {
    return i + 1;
  },
  categoryId(i) {
    return i + 1;
  },
  name(i) {
    return `Category ${i}`;
  },
  description() {
    return faker.commerce.productName();
  },
  amount() {
    return faker.commerce.price();
  },
  isNegative() {
    return false;
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  },
});
